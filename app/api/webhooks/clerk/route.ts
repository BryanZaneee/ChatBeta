import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import { prisma } from "@/lib/db";
import { 
  validateRequestSize, 
  validateContentType,
  sanitizeErrorMessage
} from '@/lib/validation';

type ClerkWebhookEvent = {
  data: {
    id: string;
    email_addresses?: Array<{ email_address: string }>;
    first_name?: string;
    last_name?: string;
    image_url?: string;
    [key: string]: any;
  };
  type: string;
};

export async function POST(req: NextRequest) {
  try {
    // --- SECURITY VALIDATION ---
    const headersList = await headers();
    const contentType = headersList.get('content-type');
    const contentLength = headersList.get('content-length');

    // Validate content type
    if (!validateContentType(contentType)) {
      console.error('Invalid content type for webhook:', contentType);
      return new Response("Invalid content type", { status: 400 });
    }

    // Validate request size (1MB limit for webhooks)
    if (!validateRequestSize(contentLength, 1 * 1024 * 1024)) {
      console.error('Webhook request too large');
      return new Response("Request too large", { status: 413 });
    }

    // Get and validate required Svix headers
    const svix_id = headersList.get("svix-id");
    const svix_timestamp = headersList.get("svix-timestamp");
    const svix_signature = headersList.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      console.error('Missing required Svix headers');
      return new Response("Error occurred -- no svix headers", {
        status: 400,
      });
    }

    // Validate timestamp to prevent replay attacks (5 minutes tolerance)
    const timestamp = parseInt(svix_timestamp, 10);
    const now = Math.floor(Date.now() / 1000);
    const maxAge = 5 * 60; // 5 minutes in seconds

    if (isNaN(timestamp) || Math.abs(now - timestamp) > maxAge) {
      console.error('Webhook timestamp validation failed');
      return new Response("Webhook timestamp invalid or too old", { status: 400 });
    }

    // Get and validate webhook secret
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('Webhook secret not configured');
      return new Response("Webhook secret not configured", { status: 500 });
    }

    // Get the body
    let payload;
    try {
      payload = await req.json();
    } catch (error) {
      console.error('Invalid JSON in webhook payload:', error);
      return new Response("Invalid JSON payload", { status: 400 });
    }

    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(webhookSecret);

    let evt: ClerkWebhookEvent;

    // Verify the payload with the headers
    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as ClerkWebhookEvent;
    } catch (error) {
      console.error("Error verifying webhook:", error);
      return new Response("Error occurred - webhook verification failed", {
        status: 400,
      });
    }

    // Validate event structure
    if (!evt.data || !evt.data.id || !evt.type) {
      console.error('Invalid webhook event structure');
      return new Response("Invalid event structure", { status: 400 });
    }

    // Handle the webhook
    const { id } = evt.data;
    const eventType = evt.type;

    // Validate event type
    const allowedEventTypes = ['user.created', 'user.updated', 'user.deleted'];
    if (!allowedEventTypes.includes(eventType)) {
      console.log('Ignoring unhandled event type:', eventType);
      return new Response("Event type not handled", { status: 200 });
    }

    if (eventType === "user.created") {
      try {
        const user = evt.data;
        
        // Validate required user data
        if (!user.id) {
          console.error('User ID missing in user.created event');
          return new Response("Invalid user data", { status: 400 });
        }

        // Create user in database with message tracking built-in
        const nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        nextMonth.setDate(1);
        
        await prisma.user.create({
          data: {
            clerkId: user.id,
            email: user.email_addresses?.[0]?.email_address || null,
            name: `${user.first_name || ''} ${user.last_name || ''}`.trim() || null,
            imageUrl: user.image_url || null,
            subscriptionTier: "free",
            regularMessages: 0,
            premiumMessages: 0,
            resetDate: nextMonth,
          },
        });

        console.log("User created:", user.id);
      } catch (error) {
        console.error("Error creating user:", error);
        return new Response("Error creating user", { status: 500 });
      }
    }

    if (eventType === "user.updated") {
      try {
        const user = evt.data;
        
        // Validate required user data
        if (!user.id) {
          console.error('User ID missing in user.updated event');
          return new Response("Invalid user data", { status: 400 });
        }
        
        await prisma.user.update({
          where: { clerkId: user.id },
          data: {
            email: user.email_addresses?.[0]?.email_address || null,
            name: `${user.first_name || ''} ${user.last_name || ''}`.trim() || null,
            imageUrl: user.image_url || null,
          },
        });

        console.log("User updated:", user.id);
      } catch (error) {
        console.error("Error updating user:", error);
        return new Response("Error updating user", { status: 500 });
      }
    }

    if (eventType === "user.deleted") {
      try {
        // Validate required user data
        if (!id) {
          console.error('User ID missing in user.deleted event');
          return new Response("Invalid user data", { status: 400 });
        }

        await prisma.user.delete({
          where: { clerkId: id },
        });

        console.log("User deleted:", id);
      } catch (error) {
        console.error("Error deleting user:", error);
        return new Response("Error deleting user", { status: 500 });
      }
    }

    return new Response("Webhook processed successfully", { status: 200 });

  } catch (error) {
    console.error('Webhook processing error:', error);
    
    // Sanitize error message before logging
    const errorMessage = error instanceof Error ? sanitizeErrorMessage(error.message) : 'Unknown webhook error';
    console.error('Sanitized error:', errorMessage);
    
    return new Response("Internal server error", { status: 500 });
  }
} 