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

    const { tier } = await req.json();
    
    if (!tier || !['free', 'paid'].includes(tier)) {
      return NextResponse.json({ error: 'Invalid tier. Must be "free" or "paid"' }, { status: 400 });
    }

    console.log('Updating subscription tier for user:', userId, 'to:', tier);

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
    return NextResponse.json({ error: 'Failed to update subscription tier' }, { status: 500 });
  }
} 