import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    // Get the current authenticated user from Clerk
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    console.log('Fetching user data for Clerk ID:', userId);

    // Fetch user data from database
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: {
        id: true,
        subscriptionTier: true,
        regularMessages: true,
        premiumMessages: true,
        resetDate: true,
        email: true,
        name: true
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found in database' }, { status: 404 });
    }

    console.log('User data fetched successfully:', user);

    return NextResponse.json({ 
      success: true,
      user: {
        subscriptionTier: user.subscriptionTier,
        messageCounts: {
          regularMessages: user.regularMessages,
          premiumMessages: user.premiumMessages,
          resetDate: user.resetDate.toISOString()
        },
        email: user.email,
        name: user.name
      }
    });

  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
  }
} 