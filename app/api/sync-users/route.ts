import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    // Get the current authenticated user from Clerk
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    console.log('Syncing user with Clerk ID:', userId);

    // Check if user already exists in database
    const existingUser = await prisma.user.findUnique({
      where: { clerkId: userId }
    });

    if (existingUser) {
      return NextResponse.json({ 
        message: 'User already exists', 
        user: existingUser 
      });
    }

    // Create the user in the database
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    nextMonth.setDate(1);

    const newUser = await prisma.user.create({
      data: {
        clerkId: userId,
        email: null, // We'll get this from Clerk later if needed
        name: null,
        imageUrl: null,
        subscriptionTier: "free",
        regularMessages: 0,
        premiumMessages: 0,
        resetDate: nextMonth,
      },
    });

    console.log('User synced successfully:', newUser);

    return NextResponse.json({ 
      message: 'User synced successfully', 
      user: newUser 
    });

  } catch (error) {
    console.error('Error syncing user:', error);
    return NextResponse.json({ error: 'Failed to sync user' }, { status: 500 });
  }
} 