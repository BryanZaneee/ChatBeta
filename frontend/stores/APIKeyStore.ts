import { create, Mutate, StoreApi } from 'zustand';
import { persist } from 'zustand/middleware';

export const PROVIDERS = ['google', 'openrouter', 'openai', 'anthropic', 'xai'] as const;
export type Provider = (typeof PROVIDERS)[number];

type APIKeys = Record<Provider, string>;

type APIKeyStore = {
  keys: APIKeys;
  setKeys: (newKeys: Partial<APIKeys>) => void;
  hasRequiredKeys: () => boolean;
  getKey: (provider: Provider) => string | null;
  validateApiKey: (provider: Provider, key: string) => { isValid: boolean; error?: string };
  isKeyValid: (provider: Provider) => boolean;
};

type StoreWithPersist = Mutate<
  StoreApi<APIKeyStore>,
  [['zustand/persist', { keys: APIKeys }]]
>;

export const withStorageDOMEvents = (store: StoreWithPersist) => {
  const storageEventCallback = (e: StorageEvent) => {
    if (e.key === store.persist.getOptions().name && e.newValue) {
      store.persist.rehydrate();
    }
  };

  window.addEventListener('storage', storageEventCallback);

  return () => {
    window.removeEventListener('storage', storageEventCallback);
  };
};

export const useAPIKeyStore = create<APIKeyStore>()(
  persist(
    (set, get) => ({
      keys: {
        google: '',
        openrouter: '',
        openai: '',
        anthropic: '',
        xai: '',
      },

      setKeys: (newKeys) => {
        // Trim whitespace from all keys to prevent authentication issues
        const trimmedKeys = Object.entries(newKeys).reduce((acc, [key, value]) => {
          acc[key as Provider] = value?.trim() || '';
          return acc;
        }, {} as Partial<APIKeys>);

        set((state) => ({
          keys: { ...state.keys, ...trimmedKeys },
        }));
      },

      hasRequiredKeys: () => {
        return !!get().keys.google;
      },

      getKey: (provider) => {
        const key = get().keys[provider];
        return key?.trim() || null;
      },

      validateApiKey: (provider, key) => {
        const trimmedKey = key.trim();
        
        if (!trimmedKey) {
          return { isValid: false, error: 'API key cannot be empty' };
        }

        switch (provider) {
          case 'openai':
            if (!trimmedKey.startsWith('sk-') && !trimmedKey.startsWith('sk-proj-')) {
              return { 
                isValid: false, 
                error: 'OpenAI API key must start with "sk-" or "sk-proj-"' 
              };
            }
            if (trimmedKey.length < 40) {
              return { 
                isValid: false, 
                error: 'OpenAI API key appears to be too short' 
              };
            }
            break;
          case 'anthropic':
            if (!trimmedKey.startsWith('sk-ant-')) {
              return { 
                isValid: false, 
                error: 'Anthropic API key must start with "sk-ant-"' 
              };
            }
            break;
          case 'google':
            if (!trimmedKey.startsWith('AIza')) {
              return { 
                isValid: false, 
                error: 'Google API key must start with "AIza"' 
              };
            }
            break;
          case 'openrouter':
            // OpenRouter supports both their own keys (sk-or-) and DeepSeek keys (sk-)
            if (!trimmedKey.startsWith('sk-or-') && !trimmedKey.startsWith('sk-')) {
              return { 
                isValid: false, 
                error: 'OpenRouter API key must start with "sk-or-" or DeepSeek key with "sk-"' 
              };
            }
            // Additional validation for DeepSeek keys
            if (trimmedKey.startsWith('sk-') && !trimmedKey.startsWith('sk-or-')) {
              // DeepSeek format: sk-e74b0b93209247b6bceac5a93bfe4d78
              if (!/^sk-[a-f0-9]{32}$/.test(trimmedKey)) {
                return {
                  isValid: false,
                  error: 'DeepSeek API key should be in format: sk-[32 hex characters]'
                };
              }
            }
            break;
          case 'xai':
            if (!trimmedKey.startsWith('xai-')) {
              return { 
                isValid: false, 
                error: 'xAI API key must start with "xai-"' 
              };
            }
            break;
        }

        return { isValid: true };
      },

      isKeyValid: (provider) => {
        const key = get().getKey(provider);
        if (!key) return false;
        
        const validation = get().validateApiKey(provider, key);
        return validation.isValid;
      },
    }),
    {
      name: 'api-keys',
      partialize: (state) => ({ keys: state.keys }),
    }
  )
);

withStorageDOMEvents(useAPIKeyStore);
