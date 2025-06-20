import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SubscriptionTier = 'free' | 'paid'; // | 'ultra' - Future tier for enhanced features

type MessageCounts = {
  regularMessages: number;
  premiumMessages: number;
  resetDate: string; // ISO date string for when counts reset
};

type SubscriptionStore = {
  tier: SubscriptionTier;
  messageCounts: MessageCounts;
  isAuthenticated: boolean;
  setTier: (tier: SubscriptionTier) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  syncWithDatabase: () => Promise<void>;
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

const getInitialMessageCounts = (isAuthenticated: boolean): MessageCounts => {
  if (isAuthenticated) {
    // Monthly reset for authenticated users
    return {
      regularMessages: 0,
      premiumMessages: 0,
      resetDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toISOString(), // First of next month
    };
  } else {
    // Weekly reset for unauthenticated users
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    return {
      regularMessages: 0,
      premiumMessages: 0,
      resetDate: nextWeek.toISOString(),
    };
  }
};

export const useSubscriptionStore = create<SubscriptionStore>()(
  persist(
    (set, get) => ({
      tier: 'free', // Default to free tier
      messageCounts: getInitialMessageCounts(false), // Default to unauthenticated
      isAuthenticated: false,

      setTier: (tier) => {
        set({ tier });
      },

      setIsAuthenticated: (isAuthenticated) => {
        const currentAuth = get().isAuthenticated;
        if (currentAuth !== isAuthenticated) {
          // Reset message counts when authentication state changes
          set({ 
            isAuthenticated,
            messageCounts: getInitialMessageCounts(isAuthenticated)
          });
        }
      },

      syncWithDatabase: async () => {
        const { isAuthenticated } = get();
        
        if (!isAuthenticated) {
          console.log('User not authenticated, skipping database sync');
          return;
        }

        try {
          console.log('Syncing subscription store with database...');
          const response = await fetch('/api/user-data');
          
          if (!response.ok) {
            console.error('Failed to fetch user data from database:', response.status);
            return;
          }

          const data = await response.json();
          
          if (data.success && data.user) {
            console.log('Syncing with database values:', data.user);
            
            set({
              tier: data.user.subscriptionTier,
              messageCounts: {
                regularMessages: data.user.messageCounts.regularMessages,
                premiumMessages: data.user.messageCounts.premiumMessages,
                resetDate: data.user.messageCounts.resetDate
              }
            });
            
            console.log('Successfully synced subscription store with database');
          }
        } catch (error) {
          console.error('Error syncing with database:', error);
        }
      },

      isFreeTier: () => {
        return get().tier === 'free';
      },

      isPaidTier: () => {
        return get().tier === 'paid';
      },

      getRegularMessageLimit: () => {
        const { tier, isAuthenticated } = get();
        
        if (!isAuthenticated) {
          return 10; // 10 messages per week for unauthenticated users
        }
        
        return tier === 'free' ? 100 : 1500; // Monthly limits for authenticated users
      },

      getPremiumMessageLimit: () => {
        const { tier, isAuthenticated } = get();
        
        if (!isAuthenticated) {
          return 0; // No premium messages for unauthenticated users
        }
        
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
        const { isAuthenticated } = get();
        set({
          messageCounts: getInitialMessageCounts(isAuthenticated),
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
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
); 