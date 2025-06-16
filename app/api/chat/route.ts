import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createXai } from '@ai-sdk/xai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamText } from 'ai';
import { headers } from 'next/headers';
import { getModelConfig, AIModel, isReasoningModel } from '@/lib/models';
import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 60;

// API key validation functions
const validateApiKey = (provider: string, key: string): { isValid: boolean; error?: string } => {
  const trimmedKey = key.trim();
  
  if (!trimmedKey) {
    return { isValid: false, error: 'API key cannot be empty' };
  }

  switch (provider) {
    case 'openai':
      if (!trimmedKey.startsWith('sk-') && !trimmedKey.startsWith('sk-proj-')) {
        return { 
          isValid: false, 
          error: 'OpenAI API key must start with "sk-" or "sk-proj-"' 
        };
      }
      if (trimmedKey.length < 40) {
        return { 
          isValid: false, 
          error: 'OpenAI API key appears to be too short' 
        };
      }
      break;
    case 'anthropic':
      if (!trimmedKey.startsWith('sk-ant-')) {
        return { 
          isValid: false, 
          error: 'Anthropic API key must start with "sk-ant-"' 
        };
      }
      break;
    case 'google':
      if (!trimmedKey.startsWith('AIza')) {
        return { 
          isValid: false, 
          error: 'Google API key must start with "AIza"' 
        };
      }
      break;
    case 'openrouter':
      // OpenRouter supports both their own keys (sk-or-) and DeepSeek keys (sk-)
      if (!trimmedKey.startsWith('sk-or-') && !trimmedKey.startsWith('sk-')) {
        return { 
          isValid: false, 
          error: 'OpenRouter API key must start with "sk-or-" or DeepSeek key with "sk-"' 
        };
      }
      // Additional validation for DeepSeek keys
      if (trimmedKey.startsWith('sk-') && !trimmedKey.startsWith('sk-or-')) {
        // DeepSeek format: sk-e74b0b93209247b6bceac5a93bfe4d78
        if (!/^sk-[a-f0-9]{32}$/.test(trimmedKey)) {
          return {
            isValid: false,
            error: 'DeepSeek API key should be in format: sk-[32 hex characters]'
          };
        }
      }
      break;
    case 'xai':
      if (!trimmedKey.startsWith('xai-')) {
        return { 
          isValid: false, 
          error: 'xAI API key must start with "xai-"' 
        };
      }
      break;
  }

  return { isValid: true };
};

export async function POST(req: NextRequest) {
  let currentModel = '';
  let currentProvider = '';
  
  try {
    const { messages, model } = await req.json();
    currentModel = model; // Store for error handling
    const headersList = await headers();

    const modelConfig = getModelConfig(model as AIModel);
    currentProvider = modelConfig.provider;

    const rawApiKey = headersList.get(modelConfig.headerKey);
    if (!rawApiKey) {
      return NextResponse.json(
        { error: `Missing API key for ${modelConfig.provider}. Please add your ${modelConfig.provider} API key in settings.` },
        { status: 401 }
      );
    }

    // Extract the actual API key from Authorization header if needed
    let apiKey = rawApiKey;
    if (modelConfig.headerKey === 'Authorization' && rawApiKey.startsWith('Bearer ')) {
      apiKey = rawApiKey.replace('Bearer ', '');
    }

    // Validate API key format
    const validation = validateApiKey(modelConfig.provider, apiKey);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: `Invalid ${modelConfig.provider} API key: ${validation.error}` },
        { status: 401 }
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
          headers: {
            'anthropic-dangerous-direct-browser-access': 'true',
          },
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

    const result = streamText({
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
  } catch (error: unknown) {
    console.error('Error in chat API:', error);
    
    // Enhanced error handling based on API error types
    if (error instanceof Error) {
      const errorMessage = error.message.toLowerCase();
      const errorCode = error.name || '';
      
      // OpenAI specific errors
      if (currentProvider === 'openai') {
        if (errorMessage.includes('rate limit') || errorMessage.includes('429') || errorCode.includes('RateLimitError')) {
          return NextResponse.json(
            { error: 'OpenAI rate limit exceeded. Please wait a moment and try again.' },
            { status: 429 }
          );
        }
        
        if (errorMessage.includes('authentication') || errorMessage.includes('401') || errorMessage.includes('unauthorized') || errorCode.includes('AuthenticationError')) {
          return NextResponse.json(
            { error: 'Invalid OpenAI API key. Please check your API key in settings. Make sure it starts with "sk-" and is valid.' },
            { status: 401 }
          );
        }
        
        if (errorMessage.includes('quota') || errorMessage.includes('billing') || errorMessage.includes('insufficient') || errorCode.includes('InsufficientQuotaError')) {
          return NextResponse.json(
            { error: 'OpenAI API quota exceeded. Please check your billing details at https://platform.openai.com/account/billing' },
            { status: 403 }
          );
        }
        
        if (errorMessage.includes('model') || errorMessage.includes('not found') || errorMessage.includes('404') || errorCode.includes('NotFoundError')) {
          if (currentModel.includes('o3') || currentModel.includes('o4-mini')) {
            return NextResponse.json(
              { error: 'OpenAI reasoning models (o3, o4-mini) require Tier 3+ account and may have limited availability. Try GPT-4.1 or GPT-4o instead.' },
              { status: 404 }
            );
          }
          if (currentModel.includes('GPT-4.1')) {
            return NextResponse.json(
              { error: 'GPT-4.1 models may not be available in your region or account tier. Try GPT-4o instead.' },
              { status: 404 }
            );
          }
          return NextResponse.json(
            { error: `OpenAI model "${currentModel}" not found or not available. Check your account tier and model access at https://platform.openai.com/account/limits` },
            { status: 404 }
          );
        }

        if (errorMessage.includes('content') || errorMessage.includes('policy') || errorCode.includes('ContentFilterError')) {
          return NextResponse.json(
            { error: 'Content blocked by OpenAI content policy. Please modify your message and try again.' },
            { status: 400 }
          );
        }
      }
      
      // Generic error handling for other providers
      if (errorMessage.includes('rate limit') || errorMessage.includes('429')) {
        return NextResponse.json(
          { error: `${currentProvider} rate limit exceeded. Please try again later.` },
          { status: 429 }
        );
      }
      
      if (errorMessage.includes('authentication') || errorMessage.includes('401') || errorMessage.includes('unauthorized')) {
        return NextResponse.json(
          { error: `Invalid ${currentProvider} API key. Please check your API key configuration.` },
          { status: 401 }
        );
      }
      
      if (errorMessage.includes('quota') || errorMessage.includes('billing') || errorMessage.includes('insufficient')) {
        return NextResponse.json(
          { error: `${currentProvider} API quota exceeded. Please check your billing details.` },
          { status: 403 }
        );
      }
      
      if (errorMessage.includes('model') || errorMessage.includes('not found') || errorMessage.includes('404')) {
        return NextResponse.json(
          { error: `Model "${currentModel}" not found or not available for ${currentProvider}.` },
          { status: 404 }
        );
      }

      if (errorMessage.includes('network') || errorMessage.includes('fetch') || errorMessage.includes('timeout')) {
        return NextResponse.json(
          { error: 'Network error occurred. Please check your connection and try again.' },
          { status: 503 }
        );
      }
    }
    
    // Generic fallback error
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
