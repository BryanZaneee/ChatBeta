import { z } from 'zod';

// Input sanitization utilities
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') {
    return '';
  }
  
  // Remove potential XSS vectors while preserving normal text
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/javascript:/gi, '') // Remove javascript: URLs
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '') // Remove event handlers
    .replace(/data:(?!image\/(?:png|jpe?g|gif|webp|svg\+xml))[^;,]*[;,]/gi, '') // Restrict data URLs
    .trim();
};

// Rate limiting validation
export const validateRateLimit = (count: number, limit: number): boolean => {
  return count < limit;
};

// Message validation schema
export const messageSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['system', 'user', 'assistant']),
    content: z.string()
      .min(1, 'Message cannot be empty')
      .max(32000, 'Message too long (max 32,000 characters)')
      .refine((content) => {
        // Check for potential prompt injection patterns
        const suspiciousPatterns = [
          /ignore\s+(?:previous|all|above)\s+(?:instructions?|prompts?)/i,
          /forget\s+(?:everything|all|previous)/i,
          /system\s*:\s*you\s+are\s+now/i,
          /\[system\]/i,
          /\beval\s*\(/i,
          /\bexec\s*\(/i,
        ];
        
        return !suspiciousPatterns.some(pattern => pattern.test(content));
      }, 'Message contains potentially harmful content')
  })),
  model: z.string()
    .min(1, 'Model must be specified')
    .max(100, 'Model name too long')
    .refine((model) => {
      // Validate against known model names from your models.ts
      const validModels = [
        'Deepseek R1 0528', 'Claude 3.7 Sonnet', 'Claude 4 Opus', 'Claude 4 Sonnet',
        'OpenAI o3', 'OpenAI o3 Pro', 'OpenAI o3-mini', 'OpenAI o4-mini',
        'Grok 3 Mini', 'Gemini 2.5 Pro', 'Deepseek V3', 'Gemini 2.5 Flash',
        'GPT-4.1', 'GPT-4.1 Mini', 'GPT-4.1 Nano', 'GPT-4o', 'GPT-4o-mini',
        'Claude 3.5 Sonnet', 'Grok 3', 'Grok 3 Fast'
      ];
      return validModels.includes(model);
    }, 'Invalid model specified')
});

// Completion validation schema (for title generation)
export const completionSchema = z.object({
  prompt: z.string()
    .min(1, 'Prompt cannot be empty')
    .max(8000, 'Prompt too long (max 8,000 characters)'),
  isTitle: z.boolean().optional(),
  messageId: z.string().optional(),
  threadId: z.string().optional()
});

// User data validation schemas
export const subscriptionUpdateSchema = z.object({
  tier: z.enum(['free', 'paid'], {
    errorMap: () => ({ message: 'Tier must be either "free" or "paid"' })
  })
});

// IP address validation (for anonymous users)
export const validateIPAddress = (ip: string): boolean => {
  // IPv4 regex
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  // IPv6 regex (simplified)
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  
  return ipv4Regex.test(ip) || ipv6Regex.test(ip) || ip === '127.0.0.1' || ip === '::1';
};

// Request size validation
export const validateRequestSize = (contentLength: string | null, maxSizeBytes: number = 10 * 1024 * 1024): boolean => {
  if (!contentLength) return true; // Let it through if no content-length header
  const size = parseInt(contentLength, 10);
  return !isNaN(size) && size <= maxSizeBytes;
};

// Content type validation
export const validateContentType = (contentType: string | null): boolean => {
  if (!contentType) return false;
  const allowedTypes = ['application/json', 'application/x-www-form-urlencoded'];
  return allowedTypes.some(type => contentType.includes(type));
};

// General text sanitization for display
export const sanitizeForDisplay = (text: string): string => {
  if (typeof text !== 'string') return '';
  
  // Basic HTML entity encoding to prevent XSS in display
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// Validate environment variables are not leaked in error messages
export const sanitizeErrorMessage = (error: string): string => {
  // Remove potential API keys or sensitive data from error messages
  return error
    .replace(/\b[A-Za-z0-9]{32,}\b/g, '[REDACTED]') // Remove long alphanumeric strings (likely API keys)
    .replace(/\bsk-[A-Za-z0-9]+/g, '[REDACTED]') // Remove OpenAI-style keys
    .replace(/\bxai-[A-Za-z0-9]+/g, '[REDACTED]') // Remove xAI keys
    .replace(/\bclaude-[A-Za-z0-9]+/g, '[REDACTED]') // Remove Anthropic keys
    .replace(/DATABASE_URL/g, '[DATABASE_CONFIG]')
    .replace(/\b(?:mongodb|postgres|mysql):\/\/[^\s]+/g, '[DATABASE_URL]');
};

// Webhook signature validation helper
export const validateWebhookSignature = (
  payload: string,
  signature: string,
  secret: string
): boolean => {
  try {
    const crypto = require('crypto');
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');
    
    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
  } catch {
    return false;
  }
};

// Export validation error handler
export const handleValidationError = (error: z.ZodError) => {
  const errorMessages = error.errors.map(err => ({
    field: err.path.join('.'),
    message: err.message
  }));
  
  return {
    error: 'Validation failed',
    details: errorMessages
  };
}; 