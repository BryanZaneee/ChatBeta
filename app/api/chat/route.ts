import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createXai } from '@ai-sdk/xai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamText } from 'ai';
import { headers } from 'next/headers';
import { getModelConfig, AIModel, isReasoningModel, isPremiumModel } from '@/lib/models';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db'; // Import Prisma client

// Clerk authentication
import { auth } from '@clerk/nextjs/server';

export const maxDuration = 60;

// Helper function to get API key from environment variables
const getApiKeyFromEnv = (provider: string): string | undefined => {
  switch (provider) {
    case 'google':
      return process.env.GOOGLE_API_KEY;
    case 'openai':
      return process.env.OPENAI_API_KEY;
    case 'anthropic':
      return process.env.ANTHROPIC_API_KEY;
    case 'xai':
      return process.env.XAI_API_KEY;
    case 'openrouter':
      // OpenRouter can use its own key or a key from another provider like DeepSeek
      return process.env.OPENROUTER_API_KEY || process.env.DEEPSEEK_API_KEY;
    default:
      return undefined;
  }
};

export async function POST(req: NextRequest) {
  let currentModel = '';
  let currentProvider = '';
  
  try {
    // --- AUTHENTICATION & RATE LIMITING ---
    const { userId } = await auth(); // Get user ID from Clerk
    const headersList = await headers(); // Get headers
    
    console.log('Auth debug - userId from Clerk:', userId);

    if (!userId) {
      // Handle anonymous users (IP-based rate limiting)
      const ip = headersList.get('x-forwarded-for') ?? '127.0.0.1';
      const usage = await prisma.anonymousUsage.findUnique({ where: { ipAddress: ip } });

      const now = new Date();
      if (usage && usage.resetDate > now && usage.messageCount >= 10) {
        return NextResponse.json({ error: 'Weekly limit of 10 messages reached for anonymous users. Sign in to get 100 messages per month.' }, { status: 429 });
      }

      // Update or create usage record for anonymous user (weekly reset)
      if (usage && usage.resetDate <= now) {
        // Reset counter (weekly)
        const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        await prisma.anonymousUsage.update({
          where: { ipAddress: ip },
          data: { messageCount: 1, resetDate: nextWeek },
        });
      } else {
        const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        await prisma.anonymousUsage.upsert({
          where: { ipAddress: ip },
          update: { messageCount: { increment: 1 } },
          create: { ipAddress: ip, messageCount: 1, resetDate: nextWeek },
        });
      }

    } else {
      // Handle authenticated users
      console.log('Looking for user with clerkId:', userId);
      
      const user = await prisma.user.findUnique({
        where: { clerkId: userId },
      });

      console.log('Found user:', user);

      if (!user) {
        // This should not happen if webhooks are set up correctly
        console.log('User not found in database for clerkId:', userId);
        return NextResponse.json({ error: 'User not found.' }, { status: 404 });
      }
      
      const isPaid = user.subscriptionTier === 'paid';
      const now = new Date();

      // Check if user has reached their limit
      if (user.resetDate > now) {
        // Check limits based on subscription tier
        if (isPaid) {
          // Paid users have both regular and premium limits
          if (user.regularMessages >= 1500) {
            return NextResponse.json({ error: 'You have reached your monthly regular message limit (1500).' }, { status: 429 });
          }
          if (user.premiumMessages >= 100) {
            return NextResponse.json({ error: 'You have reached your monthly premium message limit (100).' }, { status: 429 });
          }
        } else {
          // Free users only have regular messages
          if (user.regularMessages >= 100) {
            return NextResponse.json({ error: 'You have reached your monthly regular message limit (100).' }, { status: 429 });
          }
        }
      }

      // Defer incrementing the count until after the AI call succeeds
    }
    // Check if the model is premium (for authenticated users only)
    const { messages, model } = await req.json();
    currentModel = model; // Store for error handling
    
    // Additional check for authenticated users using premium models
    if (userId) {
      const user = await prisma.user.findUnique({
        where: { clerkId: userId },
        select: { subscriptionTier: true, regularMessages: true, premiumMessages: true, resetDate: true }
      });

      if (user) {
        const isPaid = user.subscriptionTier === 'paid';
        const isModelPremium = isPremiumModel(model as AIModel);
        const now = new Date();
        
        // Check specific limits for premium models
        if (isModelPremium && !isPaid) {
          return NextResponse.json({ 
            error: 'Premium models require a paid subscription. Please upgrade or use Gemini 2.5 Flash.' 
          }, { status: 403 });
        }
        
        if (isModelPremium && isPaid && user.resetDate > now) {
          if (user.premiumMessages >= 100) {
            return NextResponse.json({ 
              error: 'You have reached your monthly premium message limit (100). Use Gemini 2.5 Flash for regular messages.' 
            }, { status: 429 });
          }
        }
      }
    }
    // --- END OF AUTH & RATE LIMITING ---

    const modelConfig = getModelConfig(model as AIModel);
    currentProvider = modelConfig.provider;

    const apiKey = getApiKeyFromEnv(currentProvider);

    if (!apiKey) {
      return NextResponse.json(
        { error: `API key for ${currentProvider} is not configured on the server. Please contact the administrator.` },
        { status: 500 }
      );
    }

    let aiModel;

    // Configure provider based on model
    switch (modelConfig.provider) {
      case 'google':
        const google = createGoogleGenerativeAI({
          apiKey: apiKey,
        });
        aiModel = google(modelConfig.modelId);
        break;
      case 'openai':
        const openai = createOpenAI({
          apiKey: apiKey,
        });
        aiModel = openai(modelConfig.modelId);
        break;
      case 'anthropic':
        const anthropic = createAnthropic({
          apiKey: apiKey,
        });
        aiModel = anthropic(modelConfig.modelId);
        break;
      case 'xai':
        const xai = createXai({
          apiKey: apiKey,
        });
        aiModel = xai(modelConfig.modelId);
        break;
      case 'openrouter':
        const openrouter = createOpenRouter({
          apiKey: apiKey,
        });
        aiModel = openrouter(modelConfig.modelId);
        break;
      default:
        return NextResponse.json(
          { error: 'Unsupported model provider' },
          { status: 400 }
        );
    }

    // Configure reasoning parameters for o3 models and other reasoning models
    let additionalParams = {};
    if (model.includes('o3') || model.includes('o4-mini')) {
      additionalParams = {
        reasoning_effort: 'medium', // Can be 'low', 'medium', or 'high'
      };
    } else if (model.includes('Grok 3 Mini')) {
      // Grok 3 Mini supports reasoning parameters
      additionalParams = {
        reasoning: { effort: 'medium' }, // Grok uses different format
      };
    }

    // Enhanced system prompt that allows model self-identification
    const systemPrompt = `You are an AI assistant powered by ${model} in the Chat0 application. When asked about your identity, you should identify yourself as "${model}" while mentioning you're running in Chat0.

Be helpful and provide relevant information.
Be respectful and polite in all interactions.
Be engaging and maintain a conversational tone.
Always use LaTeX for mathematical expressions - 
Inline math must be wrapped in single dollar signs: $content$
Block math must be wrapped in double dollar signs: $$content$$

${isReasoningModel(model as AIModel) ? 
  'You are a reasoning model capable of complex multi-step thinking. When solving complex problems, show your reasoning process step by step.' : 
  'Provide clear and concise responses while being thorough when needed.'
}`;

    const result = await streamText({
      model: aiModel,
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        ...messages,
      ],
      onError: ({ error }) => {
        // Log the error server-side for debugging
        console.error('AI SDK streamText error:', error);
        // Note: onError should not return anything, just handle logging
      },
      onFinish: async () => {
        // This callback runs after the stream successfully finishes.
        // Now, we can safely increment the message count.
        if (userId) {
          const user = await prisma.user.findUnique({
            where: { clerkId: userId },
            select: { id: true, subscriptionTier: true }
          });

          if (user) {
            const isPaid = user.subscriptionTier === 'paid';
            const isModelPremium = isPremiumModel(model as AIModel);
            
            // Determine which counter to increment based on model and subscription
            let usageField: string;
            
            if (isModelPremium && isPaid) {
              // Premium model on paid subscription = premium counter
              usageField = 'premiumMessages';
            } else {
              // Non-premium model OR free user using any model = regular counter
              usageField = 'regularMessages';
            }
            
            // Increment message count directly in User table
            await prisma.user.update({
              where: { clerkId: userId },
              data: { [usageField]: { increment: 1 } },
            });
          }
        }
        // Note: We already incremented anonymous usage at the start of the request
        // to prevent race conditions where a user sends many requests before the first one finishes.
      },
      ...additionalParams,
    });

    return result.toDataStreamResponse({
      getErrorMessage: (error: unknown) => {
        // Handle error formatting for the client
        console.error('Data stream error:', error);
        
        if (error instanceof Error) {
          const errorMessage = error.message.toLowerCase();
          
          if (errorMessage.includes('rate limit') || errorMessage.includes('429')) {
            return `${currentProvider} rate limit exceeded. Please wait a moment and try again.`;
          }
          
          if (errorMessage.includes('authentication') || errorMessage.includes('401')) {
            return `Invalid ${currentProvider} API key. Please check your API key configuration.`;
          }
          
          if (errorMessage.includes('quota') || errorMessage.includes('billing')) {
            return `${currentProvider} API quota exceeded. Please check your billing details.`;
          }
          
          if (errorMessage.includes('model') && errorMessage.includes('not found')) {
            if (currentModel.includes('o3') || currentModel.includes('o4-mini')) {
              return 'OpenAI reasoning models (o3, o4-mini) require Tier 3+ account and may have limited availability. Try GPT-4.1 or GPT-4o instead.';
            }
            if (currentModel.includes('GPT-4.1')) {
              return 'GPT-4.1 models may not be available in your region or account tier. Try GPT-4o instead.';
            }
            return `Model "${currentModel}" not found or not available for ${currentProvider}.`;
          }

          if (errorMessage.includes('network') || errorMessage.includes('timeout')) {
            return 'Network error occurred. Please check your connection and try again.';
          }
          
          // Return the original error message if it's specific
          return error.message;
        }
        
        // Generic fallback error message
        return 'An unexpected error occurred. Please try again.';
      },
    });
  } catch (error) {
    console.error('Error in chat API:', error);

    let errorMessage = 'An unexpected error occurred. Please try again.';
    let status = 500;

    if (error instanceof Error) {
      errorMessage = error.message;
      if (error.cause) {
        // Try to get a more specific status code if available
        const cause = error.cause as { status?: number };
        status = cause.status || 500;
      }
    }

    return NextResponse.json({ error: errorMessage }, { status });
  }
}
