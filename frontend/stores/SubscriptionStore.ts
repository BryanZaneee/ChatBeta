import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SubscriptionTier = 'free' | 'paid'; // | 'ultra' - Future tier for enhanced features

type SubscriptionStore = {
  tier: SubscriptionTier;
  setTier: (tier: SubscriptionTier) => void;
  isFreeTier: () => boolean;
  isPaidTier: () => boolean;
  // isUltraTier: () => boolean; - Future method for ultra tier
};

export const useSubscriptionStore = create<SubscriptionStore>()(
  persist(
    (set, get) => ({
      tier: 'free', // Default to free tier

      setTier: (tier) => {
        set({ tier });
      },

      isFreeTier: () => {
        return get().tier === 'free';
      },

      isPaidTier: () => {
        return get().tier === 'paid';
      },

      // isUltraTier: () => {
      //   return get().tier === 'ultra';
      // }, - Future method for ultra tier with additional premium features
    }),
    {
      name: 'subscription-tier',
      partialize: (state) => ({ tier: state.tier }),
    }
  )
); 