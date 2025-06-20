import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/((?!api/).*)',
        destination: '/static-app-shell',
      },
    ];
  },
  
  // Security headers configuration
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/(.*)',
        headers: [
          // Strict Transport Security - Force HTTPS
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          // Content Security Policy - Prevent XSS attacks
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://clerk.dev https://*.clerk.accounts.dev https://challenges.cloudflare.com https://vercel.live",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https: http:",
              "connect-src 'self' https://api.openai.com https://api.anthropic.com https://generativelanguage.googleapis.com https://api.x.ai https://openrouter.ai https://clerk.dev https://*.clerk.accounts.dev https://api.deepseek.com wss: ws:",
              "frame-src 'self' https://challenges.cloudflare.com https://clerk.dev https://*.clerk.accounts.dev",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'"
            ].join('; ')
          },
          // Prevent MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          // Prevent page from being displayed in iframe (clickjacking protection)
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          // XSS Protection (legacy but still useful)
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          // Referrer Policy - Control information sent in referrer header
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          // Permissions Policy - Control browser features
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=()'
          },
          // Cross-Origin-Opener-Policy
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin'
          },
          // Cross-Origin-Resource-Policy
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-origin'
          }
        ],
      },
      {
        // More permissive headers for API routes to allow cross-origin requests if needed
        source: '/api/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate'
          }
        ],
      },
    ];
  },
};

export default nextConfig;
