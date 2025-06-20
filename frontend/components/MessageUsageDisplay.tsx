import React from 'react';
import { MessageCircle, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSubscriptionStore } from '@/frontend/stores/SubscriptionStore';

export default function MessageUsageDisplay() {
  const { 
    messageCounts, 
    isAuthenticated,
    getRegularMessageLimit, 
    getPremiumMessageLimit,
    checkAndResetIfNeeded,
    syncWithDatabase 
  } = useSubscriptionStore();

  // Check if we need to reset counts on component mount and sync with database
  React.useEffect(() => {
    checkAndResetIfNeeded();
    
    // Sync with database when component mounts (if authenticated)
    if (isAuthenticated) {
      syncWithDatabase();
    }
  }, [checkAndResetIfNeeded, syncWithDatabase, isAuthenticated]);

  const regularLimit = getRegularMessageLimit();
  const premiumLimit = getPremiumMessageLimit();
  const regularUsed = messageCounts.regularMessages;
  const premiumUsed = messageCounts.premiumMessages;

  const regularProgress = (regularUsed / regularLimit) * 100;
  const premiumProgress = premiumLimit > 0 ? (premiumUsed / premiumLimit) * 100 : 0;

  // Determine the reset period text
  const periodText = isAuthenticated ? 'per month' : 'per week';

  return (
    <div className="px-2 py-3 space-y-3">
      {/* Regular Messages */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium">Messages</span>
          </div>
          <span className="text-sm text-muted-foreground">
            {regularUsed}/{regularLimit}
          </span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2">
          <div
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              regularProgress >= 95 
                ? "bg-red-500" 
                : regularProgress >= 80 
                  ? "bg-yellow-500" 
                  : "bg-blue-500"
            )}
            style={{ width: `${Math.min(regularProgress, 100)}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          {isAuthenticated ? `Resets monthly` : `${regularLimit} messages per week`}
        </p>
      </div>

      {/* Premium Messages */}
      {isAuthenticated && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Crown className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-medium">Premium Models</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {premiumUsed}/{premiumLimit}
            </span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                premiumLimit === 0
                  ? "bg-gray-300"
                  : premiumProgress >= 95 
                    ? "bg-red-500" 
                    : premiumProgress >= 80 
                      ? "bg-yellow-500" 
                      : "bg-amber-500"
              )}
              style={{ width: `${Math.min(premiumProgress, 100)}%` }}
            />
          </div>
          {premiumLimit === 0 && (
            <p className="text-xs text-muted-foreground">
              Upgrade to access premium models (all models except Gemini 2.5 Flash)
            </p>
          )}
        </div>
      )}

      {/* Sign-in prompt for unauthenticated users */}
      {!isAuthenticated && (
        <div className="mt-2 p-2 bg-muted/50 rounded-md">
          <p className="text-xs text-muted-foreground text-center">
            Sign in to get 100 messages per month
          </p>
        </div>
      )}
    </div>
  );
} 