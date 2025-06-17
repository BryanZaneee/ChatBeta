import APIKeyForm from '@/frontend/components/APIKeyForm';
import { Link } from 'react-router';
import { buttonVariants } from '../components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import { useSubscriptionStore, SubscriptionTier } from '@/frontend/stores/SubscriptionStore';
import { Button } from '@/frontend/components/ui/button';
import { Badge } from '@/frontend/components/ui/badge';

export default function Settings() {
  const { tier, setTier, isFreeTier, isPaidTier } = useSubscriptionStore();

  const handleTierChange = (newTier: SubscriptionTier) => {
    setTier(newTier);
  };

  return (
    <section className="flex w-full h-full">
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
      <div className="flex items-center justify-center w-full h-full pt-24 pb-44 mx-auto">
        <div className="space-y-8">
          <APIKeyForm />
          
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
              Free tier: Only Gemini 2.5 Flash available | Paid tier: All models available
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
