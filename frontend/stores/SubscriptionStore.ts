import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SubscriptionTier = 'free' | 'paid'; // | 'ultra' - Future tier for enhanced features

type MessageCounts = {
  regularMessages: number;
  premiumMessages: number;
  resetDate: string; // ISO date string for when counts reset (monthly)
};

type SubscriptionStore = {
  tier: SubscriptionTier;
  messageCounts: MessageCounts;
  setTier: (tier: SubscriptionTier) => void;
  isFreeTier: () => boolean;
  isPaidTier: () => boolean;
  // Message limit methods
  getRegularMessageLimit: () => number;
  getPremiumMessageLimit: () => number;
  incrementRegularMessages: () => void;
  incrementPremiumMessages: () => void;
  resetMessageCounts: () => void;
  checkAndResetIfNeeded: () => void;
  // isUltraTier: () => boolean; - Future method for ultra tier
};

const getInitialMessageCounts = (): MessageCounts => ({
  regularMessages: 0,
  premiumMessages: 0,
  resetDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toISOString(), // First of next month
});

export const useSubscriptionStore = create<SubscriptionStore>()(
  persist(
    (set, get) => ({
      tier: 'free', // Default to free tier
      messageCounts: getInitialMessageCounts(),

      setTier: (tier) => {
        set({ tier });
      },

      isFreeTier: () => {
        return get().tier === 'free';
      },

      isPaidTier: () => {
        return get().tier === 'paid';
      },

      getRegularMessageLimit: () => {
        const { tier } = get();
        return tier === 'free' ? 100 : 1500;
      },

      getPremiumMessageLimit: () => {
        const { tier } = get();
        return tier === 'free' ? 0 : 100;
      },

      incrementRegularMessages: () => {
        get().checkAndResetIfNeeded();
        set((state) => ({
          messageCounts: {
            ...state.messageCounts,
            regularMessages: state.messageCounts.regularMessages + 1,
          },
        }));
      },

      incrementPremiumMessages: () => {
        get().checkAndResetIfNeeded();
        set((state) => ({
          messageCounts: {
            ...state.messageCounts,
            premiumMessages: state.messageCounts.premiumMessages + 1,
          },
        }));
      },

      resetMessageCounts: () => {
        set({
          messageCounts: getInitialMessageCounts(),
        });
      },

      checkAndResetIfNeeded: () => {
        const { messageCounts } = get();
        const now = new Date();
        const resetDate = new Date(messageCounts.resetDate);
        
        if (now >= resetDate) {
          get().resetMessageCounts();
        }
      },

      // isUltraTier: () => {
      //   return get().tier === 'ultra';
      // }, - Future method for ultra tier with additional premium features
    }),
    {
      name: 'subscription-tier',
      partialize: (state) => ({ 
        tier: state.tier,
        messageCounts: state.messageCounts,
      }),
    }
  )
); 