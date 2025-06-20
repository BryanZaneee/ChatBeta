import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';
import { 
  subscriptionUpdateSchema, 
  validateRequestSize, 
  validateContentType,
  sanitizeErrorMessage,
  handleValidationError
} from '@/lib/validation';
import { headers } from 'next/headers';

export async function POST(req: NextRequest) {
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

    // Validate request size (1MB limit)
    if (!validateRequestSize(contentLength, 1 * 1024 * 1024)) {
      return NextResponse.json(
        { error: 'Request too large. Maximum size is 1MB.' },
        { status: 413 }
      );
    }

    // --- AUTHENTICATION ---
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
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

    // Validate input using Zod schema
    const validationResult = subscriptionUpdateSchema.safeParse(requestBody);
    
    if (!validationResult.success) {
      const validationError = handleValidationError(validationResult.error);
      return NextResponse.json(validationError, { status: 400 });
    }

    const { tier } = validationResult.data;

    console.log('Updating subscription tier for user:', userId, 'to:', tier);

    // Check if user exists before updating
    const existingUser = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { id: true, subscriptionTier: true }
    });

    if (!existingUser) {
      return NextResponse.json({ error: 'User not found in database' }, { status: 404 });
    }

    // Prevent unnecessary updates
    if (existingUser.subscriptionTier === tier) {
      return NextResponse.json({ 
        message: 'Subscription tier is already set to this value', 
        user: { ...existingUser, clerkId: userId }
      });
    }

    // Update the user's subscription tier in the database
    const updatedUser = await prisma.user.update({
      where: { clerkId: userId },
      data: { subscriptionTier: tier },
      select: { id: true, subscriptionTier: true, clerkId: true }
    });

    console.log('Subscription tier updated successfully:', updatedUser);

    return NextResponse.json({ 
      message: 'Subscription tier updated successfully', 
      user: updatedUser 
    });

  } catch (error) {
    console.error('Error updating subscription tier:', error);
    
    // Sanitize error message before returning
    const errorMessage = error instanceof Error ? sanitizeErrorMessage(error.message) : 'Failed to update subscription tier';
    
    return NextResponse.json(
      { error: errorMessage }, 
      { status: 500 }
    );
  }
} 