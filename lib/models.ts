import { Provider } from '@/frontend/stores/APIKeyStore';

// Reasoning models that can perform complex multi-step thinking
export const REASONING_MODELS = [
  'Deepseek R1 0528',
  'Claude 3.7 Sonnet',
  'Claude 4 Opus',
  'Claude 4 Sonnet',
  'OpenAI o3',
  'OpenAI o3 Pro',
  'OpenAI o3-mini',
  'OpenAI o4-mini',
  'Grok 3 Mini',
  'Gemini 2.5 Pro',
] as const;

// Standard non-reasoning models
export const STANDARD_MODELS = [
  'Deepseek V3',
  'Gemini 2.5 Flash',
  'GPT-4.1',
  'GPT-4.1 Mini',
  'GPT-4.1 Nano',
  'GPT-4o',
  'GPT-4o-mini',
  'Claude 3.5 Sonnet',
  'Grok 3',
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
  // Reasoning Models
  'Deepseek R1 0528': {
    modelId: 'deepseek/deepseek-r1-distill-llama-70b',
    provider: 'openrouter',
    headerKey: 'X-OpenRouter-API-Key',
  },
  'Claude 3.7 Sonnet': {
    modelId: 'claude-3-7-sonnet-20250219',
    provider: 'anthropic',
    headerKey: 'X-Anthropic-API-Key',
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
  'OpenAI o3': {
    modelId: 'o3-2025-04-16',
    provider: 'openai',
    headerKey: 'Authorization',
  },
  'OpenAI o3 Pro': {
    modelId: 'o3-pro-2025-04-16',
    provider: 'openai',
    headerKey: 'Authorization',
  },
  'OpenAI o3-mini': {
    modelId: 'o3-mini-2025-01-31',
    provider: 'openai',
    headerKey: 'Authorization',
  },
  'OpenAI o4-mini': {
    modelId: 'o4-mini-2025-04-16',
    provider: 'openai',
    headerKey: 'Authorization',
  },
  'Grok 3 Mini': {
    modelId: 'grok-3-mini-beta',
    provider: 'xai',
    headerKey: 'Authorization',
  },
  'Gemini 2.5 Pro': {
    modelId: 'gemini-2.5-pro-preview-06-05',
    provider: 'google',
    headerKey: 'X-Google-API-Key',
  },
  
  // Standard Models
  'Deepseek V3': {
    modelId: 'deepseek/deepseek-chat-v3',
    provider: 'openrouter',
    headerKey: 'X-OpenRouter-API-Key',
  },
  'Gemini 2.5 Flash': {
    modelId: 'gemini-2.5-flash-preview-05-20',
    provider: 'google',
    headerKey: 'X-Google-API-Key',
  },
  'GPT-4.1': {
    modelId: 'gpt-4.1-2025-04-14',
    provider: 'openai',
    headerKey: 'Authorization',
  },
  'GPT-4.1 Mini': {
    modelId: 'gpt-4.1-mini-2025-04-14',
    provider: 'openai',
    headerKey: 'Authorization',
  },
  'GPT-4.1 Nano': {
    modelId: 'gpt-4.1-nano-2025-04-14',
    provider: 'openai',
    headerKey: 'Authorization',
  },
  'GPT-4o': {
    modelId: 'gpt-4o',
    provider: 'openai',
    headerKey: 'Authorization',
  },
  'GPT-4o-mini': {
    modelId: 'gpt-4o-mini',
    provider: 'openai',
    headerKey: 'Authorization',
  },
  'Claude 3.5 Sonnet': {
    modelId: 'claude-3-5-sonnet-20241022',
    provider: 'anthropic',
    headerKey: 'X-Anthropic-API-Key',
  },
  'Grok 3': {
    modelId: 'grok-3',
    provider: 'xai',
    headerKey: 'Authorization',
  },
  'Grok 3 Fast': {
    modelId: 'grok-3-fast',
    provider: 'xai',
    headerKey: 'Authorization',
  },
} as const satisfies Record<AIModel, ModelConfig>;

export function getModelConfig(model: AIModel): ModelConfig {
  const config = MODEL_CONFIGS[model];
  if (!config) {
    // Fallback to a default model if the requested model is not found
    console.warn(`Model "${model}" not found in MODEL_CONFIGS, falling back to default`);
    return MODEL_CONFIGS['Gemini 2.5 Flash']; // Default fallback model
  }
  return config;
}

export const isReasoningModel = (modelName: AIModel): boolean => {
  return REASONING_MODELS.includes(modelName as typeof REASONING_MODELS[number]);
};
