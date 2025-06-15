import React, { useCallback, useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldError, useForm, UseFormRegister } from 'react-hook-form';

import { Button } from '@/frontend/components/ui/button';
import { Input } from '@/frontend/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/frontend/components/ui/card';
import { Key, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useAPIKeyStore } from '@/frontend/stores/APIKeyStore';
import { Badge } from './ui/badge';

const formSchema = z.object({
  google: z.string().trim().min(1, {
    message: 'Google API key is required for Title Generation',
  }),
  openrouter: z.string().trim().optional(),
  openai: z.string().trim().optional(),
  anthropic: z.string().trim().optional(),
  xai: z.string().trim().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function APIKeyForm() {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          <CardTitle>Add Your API Keys To Start Chatting</CardTitle>
        </div>
        <CardDescription>
          Keys are stored locally in your browser and validated for correct format.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form />
      </CardContent>
    </Card>
  );
}

const Form = () => {
  const { keys, setKeys, validateApiKey } = useAPIKeyStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: keys,
  });

  useEffect(() => {
    reset(keys);
  }, [keys, reset]);

  const onSubmit = useCallback(
    (values: FormValues) => {
      // Validate all keys before saving
      const validationErrors: string[] = [];
      
      Object.entries(values).forEach(([provider, key]) => {
        if (key && key.trim()) {
          const validation = validateApiKey(provider as any, key);
          if (!validation.isValid) {
            validationErrors.push(`${provider}: ${validation.error}`);
          }
        }
      });

      if (validationErrors.length > 0) {
        toast.error(`API Key Validation Errors:\n${validationErrors.join('\n')}`);
        return;
      }

      setKeys(values);
      toast.success('API keys saved successfully');
    },
    [setKeys, validateApiKey]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <ApiKeyField
        id="google"
        label="Google API Key"
        models={['Gemini 2.5 Flash', 'Gemini 2.5 Pro']}
        linkUrl="https://aistudio.google.com/apikey"
        placeholder="AIza..."
        register={register}
        error={errors.google}
        validateApiKey={validateApiKey}
        watch={watch}
        required
      />

      <ApiKeyField
        id="openrouter"
        label="OpenRouter API Key"
        models={['DeepSeek R1 0538', 'DeepSeek-V3']}
        linkUrl="https://openrouter.ai/settings/keys"
        placeholder="sk-or-... or sk-... (DeepSeek)"
        register={register}
        error={errors.openrouter}
        validateApiKey={validateApiKey}
        watch={watch}
      />

      <ApiKeyField
        id="openai"
        label="OpenAI API Key"
        models={['GPT-4o', 'GPT-4o-mini', 'OpenAI o3-mini (Tier 3+ required)']}
        linkUrl="https://platform.openai.com/settings/organization/api-keys"
        placeholder="sk-..."
        register={register}
        error={errors.openai}
        validateApiKey={validateApiKey}
        watch={watch}
      />

      <ApiKeyField
        id="anthropic"
        label="Anthropic API Key"
        models={['Claude 4 Opus', 'Claude 4 Sonnet', 'Claude 3.7 Sonnet', 'Claude 3.5 Sonnet', 'Claude 3.5 Haiku']}
        linkUrl="https://console.anthropic.com/settings/keys"
        placeholder="sk-ant-..."
        register={register}
        error={errors.anthropic}
        validateApiKey={validateApiKey}
        watch={watch}
      />

      <ApiKeyField
        id="xai"
        label="xAI API Key"
        models={['Grok 3', 'Grok 3 Mini', 'Grok 3 Fast']}
        linkUrl="https://dashboard.x.ai"
        placeholder="xai-..."
        register={register}
        error={errors.xai}
        validateApiKey={validateApiKey}
        watch={watch}
      />

      <Button type="submit" className="w-full" disabled={!isDirty}>
        Save API Keys
      </Button>
    </form>
  );
};

const ApiKeyField = ({
  id,
  label,
  models,
  linkUrl,
  placeholder,
  register,
  error,
  validateApiKey,
  watch,
  required = false,
}: {
  id: string;
  label: string;
  models: string[];
  linkUrl: string;
  placeholder: string;
  register: UseFormRegister<FormValues>;
  error?: FieldError;
  validateApiKey: (provider: any, key: string) => { isValid: boolean; error?: string };
  watch: any;
  required?: boolean;
}) => {
  const [validationStatus, setValidationStatus] = useState<{
    status: 'idle' | 'valid' | 'invalid';
    message?: string;
  }>({ status: 'idle' });

  const currentValue = watch(id);

  useEffect(() => {
    if (!currentValue || !currentValue.trim()) {
      setValidationStatus({ status: 'idle' });
      return;
    }

    const validation = validateApiKey(id, currentValue);
    setValidationStatus({
      status: validation.isValid ? 'valid' : 'invalid',
      message: validation.error,
    });
  }, [currentValue, validateApiKey, id]);

  const getValidationIcon = () => {
    switch (validationStatus.status) {
      case 'valid':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'invalid':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getValidationMessage = () => {
    if (validationStatus.status === 'invalid' && validationStatus.message) {
      return (
        <div className="flex items-center gap-1 text-sm text-red-500 mt-1">
          <AlertCircle className="h-3 w-3" />
          {validationStatus.message}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <a
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:underline"
        >
          Get API Key
        </a>
      </div>
      <div className="relative">
        <Input
          id={id}
          type="password"
          placeholder={placeholder}
          {...register(id as keyof FormValues)}
          className={`pr-8 ${
            validationStatus.status === 'valid' 
              ? 'border-green-500' 
              : validationStatus.status === 'invalid' 
                ? 'border-red-500' 
                : ''
          }`}
        />
        {getValidationIcon() && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            {getValidationIcon()}
          </div>
        )}
      </div>
      {getValidationMessage()}
      {error && (
        <div className="flex items-center gap-1 text-sm text-red-500">
          <AlertCircle className="h-3 w-3" />
          {error.message}
        </div>
      )}
      <div className="flex flex-wrap gap-1">
        {models.map((model) => (
          <Badge key={model} variant="secondary" className="text-xs">
            {model}
          </Badge>
        ))}
      </div>
    </div>
  );
};
