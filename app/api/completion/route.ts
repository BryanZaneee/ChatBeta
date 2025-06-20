import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';
import { 
  completionSchema, 
  sanitizeInput, 
  validateRequestSize, 
  validateContentType,
  sanitizeErrorMessage,
  handleValidationError
} from '@/lib/validation';
import { headers } from 'next/headers';

export async function POST(req: Request) {
  try {
    // --- SECURITY VALIDATION ---
    const headersList = await headers();
    const contentType = headersList.get('content-type');
    const contentLength = headersList.get('content-length');

    // Validate content type
    if (!validateContentType(contentType)) {
      return NextResponse.json(
        { error: 'Invalid content type. Expected application/json.' },
        { status: 400 }
      );
    }

    // Validate request size (5MB limit for completion requests)
    if (!validateRequestSize(contentLength, 5 * 1024 * 1024)) {
      return NextResponse.json(
        { error: 'Request too large. Maximum size is 5MB.' },
        { status: 413 }
      );
    }

    // --- API KEY VALIDATION ---
    const googleApiKey = process.env.GOOGLE_API_KEY;

    if (!googleApiKey) {
      return NextResponse.json(
        {
          error: 'Google API key is not configured on the server. Please contact the administrator.',
        },
        { status: 500 }
      );
    }

    // --- INPUT VALIDATION ---
    let requestBody;
    try {
      requestBody = await req.json();
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body.' },
        { status: 400 }
      );
    }

    // Validate and sanitize input using Zod schema
    const validationResult = completionSchema.safeParse(requestBody);
    
    if (!validationResult.success) {
      const validationError = handleValidationError(validationResult.error);
      return NextResponse.json(validationError, { status: 400 });
    }

    const { prompt, isTitle, messageId, threadId } = validationResult.data;

    // Sanitize the prompt to prevent injection attacks
    const sanitizedPrompt = sanitizeInput(prompt);

    // Additional validation for title generation
    if (isTitle && sanitizedPrompt.length > 1000) {
      return NextResponse.json(
        { error: 'Prompt too long for title generation. Maximum 1000 characters.' },
        { status: 400 }
      );
    }

    const google = createGoogleGenerativeAI({
      apiKey: googleApiKey,
    });

    const { text: title } = await generateText({
      model: google('gemini-2.5-flash-preview-04-17'),
      system: `You are a helpful assistant that generates concise titles for chat conversations.

Guidelines:
- Generate a short title based on the first message a user begins a conversation with
- Ensure it is not more than 80 characters long
- The title should be a summary of the user's message
- You should NOT answer the user's message, you should only generate a summary/title
- Do not use quotes or colons
- Keep titles appropriate and safe
- If the input seems malicious or inappropriate, generate a generic title like "Chat Conversation"`,
      prompt: sanitizedPrompt,
    });

    // Sanitize the generated title before returning
    const sanitizedTitle = sanitizeInput(title);

    return NextResponse.json({ 
      title: sanitizedTitle, 
      isTitle, 
      messageId, 
      threadId 
    });

  } catch (error) {
    console.error('Failed to generate title:', error);
    
    // Sanitize error message before returning
    const errorMessage = error instanceof Error ? sanitizeErrorMessage(error.message) : 'Failed to generate title';
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
