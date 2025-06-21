import React, { useState } from 'react';
import { Link } from 'react-router';
import { buttonVariants } from '../components/ui/button';
import { ArrowLeftIcon, MessageCircle, Crown, RotateCcw, Plus, RefreshCw } from 'lucide-react';
import { useSubscriptionStore, SubscriptionTier } from '@/frontend/stores/SubscriptionStore';
import { Button } from '@/frontend/components/ui/button';
import { Badge } from '@/frontend/components/ui/badge';
import { Input } from '@/frontend/components/ui/input';
import { toast } from 'sonner';
import { SidebarTrigger, useSidebar } from '../components/ui/sidebar';

export default function Settings() {
  const { 
    tier, 
    setTier, 
    isFreeTier, 
    isPaidTier,
    messageCounts,
    getRegularMessageLimit,
    getPremiumMessageLimit,
    incrementRegularMessages,
    incrementPremiumMessages,
    resetMessageCounts,
    checkAndResetIfNeeded,
    syncWithDatabase
  } = useSubscriptionStore();

  const [regularAmount, setRegularAmount] = useState(1);
  const [premiumAmount, setPremiumAmount] = useState(1);

  const handleTierChange = async (newTier: SubscriptionTier) => {
    try {
      // Update the local state first
      setTier(newTier);
      
      // Update the database
      const response = await fetch('/api/update-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tier: newTier }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update subscription tier');
      }
      
      const data = await response.json();
      console.log('Subscription tier updated in database:', data);
      
      toast.success(`Switched to ${newTier.toUpperCase()} tier and updated in database`);
    } catch (error) {
      console.error('Error updating subscription tier:', error);
      toast.error(`Failed to update subscription tier: ${error instanceof Error ? error.message : 'Unknown error'}`);
      
      // Revert the local state if database update failed
      setTier(tier);
    }
  };

  const handleIncrementRegular = () => {
    const limit = getRegularMessageLimit();
    const currentCount = messageCounts.regularMessages;
    const amountToAdd = Math.min(regularAmount, limit - currentCount);
    
    if (currentCount >= limit) {
      toast.error('Regular message limit already reached!');
      return;
    }
    
    if (amountToAdd <= 0) {
      toast.error('Cannot add more messages - would exceed limit!');
      return;
    }

    // Add messages in batch
    for (let i = 0; i < amountToAdd; i++) {
      incrementRegularMessages();
    }
    
    const newCount = currentCount + amountToAdd;
    toast.success(`Added ${amountToAdd} regular messages (${newCount}/${limit})`);
    
    if (amountToAdd < regularAmount) {
      toast.warning(`Only added ${amountToAdd} messages to avoid exceeding limit`);
    }
  };

  const handleIncrementPremium = () => {
    const limit = getPremiumMessageLimit();
    const currentCount = messageCounts.premiumMessages;
    const amountToAdd = Math.min(premiumAmount, limit - currentCount);
    
    if (limit === 0) {
      toast.error('Premium messages not available on free tier!');
      return;
    }
    
    if (currentCount >= limit) {
      toast.error('Premium message limit already reached!');
      return;
    }
    
    if (amountToAdd <= 0) {
      toast.error('Cannot add more messages - would exceed limit!');
      return;
    }

    // Add messages in batch
    for (let i = 0; i < amountToAdd; i++) {
      incrementPremiumMessages();
    }
    
    const newCount = currentCount + amountToAdd;
    toast.success(`Added ${amountToAdd} premium messages (${newCount}/${limit})`);
    
    if (amountToAdd < premiumAmount) {
      toast.warning(`Only added ${amountToAdd} messages to avoid exceeding limit`);
    }
  };

  const handleResetCounts = () => {
    resetMessageCounts();
    toast.success('Message counts reset to 0');
  };

  const handleSyncWithDatabase = async () => {
    toast.loading('Syncing with database...');
    await syncWithDatabase();
    toast.dismiss();
    toast.success('Successfully synced with database');
  };

  // Quick preset buttons for common test amounts
  const handleQuickAdd = (type: 'regular' | 'premium', amount: number) => {
    if (type === 'regular') {
      setRegularAmount(amount);
    } else {
      setPremiumAmount(amount);
    }
  };

  // Check and update counts on component mount and sync with database
  React.useEffect(() => {
    checkAndResetIfNeeded();
    
    // Sync with database to ensure counters are accurate
    syncWithDatabase();
  }, [checkAndResetIfNeeded, syncWithDatabase]);

  const regularLimit = getRegularMessageLimit();
  const premiumLimit = getPremiumMessageLimit();
  const regularProgress = (messageCounts.regularMessages / regularLimit) * 100;
  const premiumProgress = premiumLimit > 0 ? (messageCounts.premiumMessages / premiumLimit) * 100 : 0;

  return (
    <section className="flex w-full h-full">
      <SettingsSidebarTrigger />
      <Link
        to="/chat"
        className={buttonVariants({
          variant: 'default',
          className: 'w-fit fixed top-10 left-40 z-10',
        })}
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Back to Chat
      </Link>
      <div className="flex items-center justify-center w-full h-full pt-24 pb-44 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 max-w-2xl w-full">
          
          {/* Debug: Tier Toggle */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 text-yellow-800 dark:text-yellow-200">
              🚧 Debug: Subscription Tier
            </h3>
            <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-4">
              Toggle between subscription tiers for testing. This will be replaced with actual subscription logic.
            </p>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Current Tier:</span>
              <Badge variant={isFreeTier() ? "secondary" : "default"}>
                {tier.toUpperCase()}
              </Badge>
            </div>
            <div className="flex gap-2 mt-4">
              <Button
                size="sm"
                variant={isFreeTier() ? "default" : "outline"}
                onClick={() => handleTierChange('free')}
              >
                Free Tier
              </Button>
              <Button
                size="sm"
                variant={isPaidTier() ? "default" : "outline"}
                onClick={() => handleTierChange('paid')}
              >
                Paid Tier
              </Button>
              {/* Future: Ultra Tier */}
              {/* <Button
                size="sm"
                variant={isUltraTier() ? "default" : "outline"}
                onClick={() => handleTierChange('ultra')}
                disabled
              >
                Ultra Tier (Coming Soon)
              </Button> */}
            </div>
            <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">
              Free tier: Only Gemini 2.5 Flash available | Paid tier: All models available (premium models count toward premium limit)
            </p>
          </div>

          {/* Debug: Message Counter Controls */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 text-blue-800 dark:text-blue-200">
              🚧 Debug: Message Counters
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
              Test message usage limits and progress bar color coding. Check the sidebar to see the visual progress bars.
            </p>
            
            {/* Current Usage Display */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border">
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Regular Messages</span>
                </div>
                <div className="text-lg font-bold">
                  {messageCounts.regularMessages}/{regularLimit}
                </div>
                <div className="text-xs text-muted-foreground">
                  {regularProgress.toFixed(1)}% used
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border">
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-medium">Premium Messages</span>
                </div>
                <div className="text-lg font-bold">
                  {messageCounts.premiumMessages}/{premiumLimit}
                </div>
                <div className="text-xs text-muted-foreground">
                  {premiumLimit > 0 ? `${premiumProgress.toFixed(1)}% used` : 'Not available'}
                </div>
              </div>
            </div>

            {/* Control Buttons with Amount Inputs */}
            <div className="space-y-4">
              {/* Regular Messages Controls */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  Regular Messages
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="1"
                    max={regularLimit - messageCounts.regularMessages}
                    value={regularAmount}
                    onChange={(e) => setRegularAmount(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleIncrementRegular}
                    disabled={messageCounts.regularMessages >= regularLimit}
                    className="flex items-center gap-1"
                  >
                    <Plus className="h-3 w-3" />
                    <MessageCircle className="h-3 w-3" />
                    Add
                  </Button>
                  {/* Quick preset buttons */}
                  <div className="flex gap-1">
                    {[10, 50, 100].map((amount) => (
                      <Button
                        key={amount}
                        size="sm"
                        variant="ghost"
                        onClick={() => handleQuickAdd('regular', amount)}
                        className="text-xs px-2 py-1 h-6"
                      >
                        {amount}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Premium Messages Controls */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  Premium Messages
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="1"
                    max={Math.max(0, premiumLimit - messageCounts.premiumMessages)}
                    value={premiumAmount}
                    onChange={(e) => setPremiumAmount(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20"
                    disabled={premiumLimit === 0}
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleIncrementPremium}
                    disabled={premiumLimit === 0 || messageCounts.premiumMessages >= premiumLimit}
                    className="flex items-center gap-1"
                  >
                    <Plus className="h-3 w-3" />
                    <Crown className="h-3 w-3" />
                    Add
                  </Button>
                  {/* Quick preset buttons */}
                  <div className="flex gap-1">
                    {[10, 25, 50].map((amount) => (
                      <Button
                        key={amount}
                        size="sm"
                        variant="ghost"
                        onClick={() => handleQuickAdd('premium', amount)}
                        className="text-xs px-2 py-1 h-6"
                        disabled={premiumLimit === 0}
                      >
                        {amount}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reset and Sync Buttons */}
              <div className="pt-2 border-t">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={handleResetCounts}
                    className="flex items-center gap-1"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Reset All Counts
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleSyncWithDatabase}
                    className="flex items-center gap-1"
                  >
                    <RefreshCw className="h-3 w-3" />
                    Sync with Database
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-4 text-xs space-y-1">
              <p className="text-blue-600 dark:text-blue-400">
                <strong>Progress Bar Colors:</strong>
              </p>
              <p className="text-blue-600 dark:text-blue-400">• 0-79%: Blue/Gold (Normal)</p>
              <p className="text-yellow-600 dark:text-yellow-400">• 80-94%: Yellow (Warning)</p>
              <p className="text-red-600 dark:text-red-400">• 95-100%: Red (Critical)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const SettingsSidebarTrigger = () => {
  const { state, isMobile } = useSidebar();
  
  // On mobile, always show the trigger (sidebar uses Sheet overlay)
  // On desktop, only show when sidebar is collapsed
  if (isMobile || state === 'collapsed') {
    return <SidebarTrigger className="fixed left-4 top-4 z-100" />;
  }
  return null;
};
