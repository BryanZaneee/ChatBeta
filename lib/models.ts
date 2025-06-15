import { Provider } from '@/frontend/stores/APIKeyStore';

// Reasoning models that can perform complex multi-step thinking
export const REASONING_MODELS = [
  'Deepseek R1 0528',
  'Claude 3.7 Sonnet',
] as const;

// Standard non-reasoning models
export const STANDARD_MODELS = [
  'Deepseek V3',
  'Gemini 2.5 Pro',
  'Gemini 2.5 Flash',
  'GPT-4o',
  'GPT-4.1-mini',
  'Claude 4 Opus',
  'Claude 4 Sonnet',
  'Claude 3.5 Sonnet',
  'Claude 3.5 Haiku',
  'Grok 3',
  'Grok 3 Mini',
  'Grok 3 Fast',
] as const;

export const AI_MODELS = [...REASONING_MODELS, ...STANDARD_MODELS] as const;

export type AIModel = (typeof AI_MODELS)[number];

export type ModelConfig = {
  modelId: string;
  provider: Provider;
  headerKey: string;
};

export const MODEL_CONFIGS = {
  'Deepseek R1 0528': {
    modelId: 'deepseek/deepseek-r1-0528:free',
    provider: 'openrouter',
    headerKey: 'X-OpenRouter-API-Key',
  },
  'Deepseek V3': {
    modelId: 'deepseek/deepseek-chat-v3-0324:free',
    provider: 'openrouter',
    headerKey: 'X-OpenRouter-API-Key',
  },
  'Gemini 2.5 Pro': {
    modelId: 'gemini-2.5-pro-preview-05-06',
    provider: 'google',
    headerKey: 'X-Google-API-Key',
  },
  'Gemini 2.5 Flash': {
    modelId: 'gemini-2.5-flash-preview-04-17',
    provider: 'google',
    headerKey: 'X-Google-API-Key',
  },
  'GPT-4o': {
    modelId: 'gpt-4o',
    provider: 'openai',
    headerKey: 'X-OpenAI-API-Key',
  },
  'GPT-4.1-mini': {
    modelId: 'gpt-4.1-mini',
    provider: 'openai',
    headerKey: 'X-OpenAI-API-Key',
  },
  'Claude 4 Opus': {
    modelId: 'claude-opus-4-20250514',
    provider: 'anthropic',
    headerKey: 'X-Anthropic-API-Key',
  },
  'Claude 4 Sonnet': {
    modelId: 'claude-sonnet-4-20250514',
    provider: 'anthropic',
    headerKey: 'X-Anthropic-API-Key',
  },
  'Claude 3.7 Sonnet': {
    modelId: 'claude-3-7-sonnet-20250219',
    provider: 'anthropic',
    headerKey: 'X-Anthropic-API-Key',
  },
  'Claude 3.5 Sonnet': {
    modelId: 'claude-3-5-sonnet-20241022',
    provider: 'anthropic',
    headerKey: 'X-Anthropic-API-Key',
  },
  'Claude 3.5 Haiku': {
    modelId: 'claude-3-5-haiku-20241022',
    provider: 'anthropic',
    headerKey: 'X-Anthropic-API-Key',
  },
  'Grok 3': {
    modelId: 'grok-3',
    provider: 'xai',
    headerKey: 'X-xAI-API-Key',
  },
  'Grok 3 Mini': {
    modelId: 'grok-3-mini',
    provider: 'xai',
    headerKey: 'X-xAI-API-Key',
  },
  'Grok 3 Fast': {
    modelId: 'grok-3-fast',
    provider: 'xai',
    headerKey: 'X-xAI-API-Key',
  },
} as const satisfies Record<AIModel, ModelConfig>;

export const getModelConfig = (modelName: AIModel): ModelConfig => {
  return MODEL_CONFIGS[modelName];
};

export const isReasoningModel = (modelName: AIModel): boolean => {
  return REASONING_MODELS.includes(modelName as any);
};
