import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { useAPIKeyStore, Provider } from '@/frontend/stores/APIKeyStore';
import { useModelStore } from '@/frontend/stores/ModelStore';
import { CheckCircle, XCircle, AlertTriangle, ExternalLink, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export default function APIKeyDiagnostics() {
  const { keys, validateApiKey, isKeyValid } = useAPIKeyStore();
  const selectedModel = useModelStore((state) => state.selectedModel);
  const modelConfig = useModelStore((state) => state.getModelConfig());
  const [isTestingConnection, setIsTestingConnection] = useState(false);

  const testOpenAIConnection = async () => {
    if (!keys.openai) {
      toast.error('No OpenAI API key found');
      return;
    }

    setIsTestingConnection(true);
    try {
      const response = await fetch('/api/test-openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${keys.openai}`,
        },
        body: JSON.stringify({ model: 'gpt-3.5-turbo' }),
      });

      if (response.ok) {
        toast.success('OpenAI connection successful!');
      } else {
        const error = await response.json();
        toast.error(`OpenAI connection failed: ${error.error}`);
      }
    } catch (error) {
      toast.error('Network error testing OpenAI connection');
    } finally {
      setIsTestingConnection(false);
    }
  };

  const getDiagnosticStatus = (provider: Provider) => {
    const key = keys[provider];
    if (!key) {
      return { status: 'missing', message: 'No API key provided', color: 'text-red-500' };
    }

    const validation = validateApiKey(provider, key);
    if (!validation.isValid) {
      return { status: 'invalid', message: validation.error, color: 'text-red-500' };
    }

    return { status: 'valid', message: 'API key format is valid', color: 'text-green-500' };
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'valid':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'invalid':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'missing':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const providers = [
    { 
      key: 'openai' as Provider, 
      name: 'OpenAI', 
      docs: 'https://platform.openai.com/docs/quickstart',
      billing: 'https://platform.openai.com/account/billing',
      keyUrl: 'https://platform.openai.com/settings/organization/api-keys',
      notes: 'Keys should start with "sk-" or "sk-proj-". o3-mini requires Tier 3+ account.'
    },
    { 
      key: 'anthropic' as Provider, 
      name: 'Anthropic', 
      docs: 'https://docs.anthropic.com/claude/docs/quickstart',
      billing: 'https://console.anthropic.com/settings/billing',
      keyUrl: 'https://console.anthropic.com/settings/keys',
      notes: 'Keys should start with "sk-ant-".'
    },
    { 
      key: 'google' as Provider, 
      name: 'Google', 
      docs: 'https://ai.google.dev/docs',
      billing: 'https://console.cloud.google.com/billing',
      keyUrl: 'https://aistudio.google.com/apikey',
      notes: 'Keys should start with "AIza".'
    },
    { 
      key: 'openrouter' as Provider, 
      name: 'OpenRouter', 
      docs: 'https://openrouter.ai/docs',
      billing: 'https://openrouter.ai/account',
      keyUrl: 'https://openrouter.ai/settings/keys',
      notes: 'Keys should start with "sk-or-" for OpenRouter or "sk-" for DeepSeek keys (format: sk-[32 hex chars]).'
    },
    { 
      key: 'xai' as Provider, 
      name: 'xAI', 
      docs: 'https://docs.x.ai/',
      billing: 'https://dashboard.x.ai',
      keyUrl: 'https://dashboard.x.ai',
      notes: 'Keys should start with "xai-".'
    }
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          API Key Diagnostics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-sm text-muted-foreground">
          Currently selected: <Badge variant="outline">{selectedModel}</Badge> using <Badge variant="outline">{modelConfig.provider}</Badge>
        </div>

        <div className="grid gap-4">
          {providers.map((provider) => {
            const diagnostic = getDiagnosticStatus(provider.key);
            const hasKey = !!keys[provider.key];
            
            return (
              <div key={provider.key} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{provider.name}</h3>
                    {getStatusIcon(diagnostic.status)}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      asChild
                      className="h-8 px-2"
                    >
                      <a href={provider.keyUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Get Key
                      </a>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      asChild
                      className="h-8 px-2"
                    >
                      <a href={provider.docs} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Docs
                      </a>
                    </Button>
                    {hasKey && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        asChild
                        className="h-8 px-2"
                      >
                        <a href={provider.billing} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Billing
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className={`text-sm ${diagnostic.color}`}>
                  {diagnostic.message}
                </div>
                
                <div className="text-xs text-muted-foreground">
                  {provider.notes}
                </div>
                
                {provider.key === 'openai' && hasKey && diagnostic.status === 'valid' && (
                  <Button
                    onClick={testOpenAIConnection}
                    disabled={isTestingConnection}
                    variant="outline"
                    size="sm"
                    className="mt-2"
                  >
                    {isTestingConnection ? (
                      <>
                        <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                        Testing...
                      </>
                    ) : (
                      'Test Connection'
                    )}
                  </Button>
                )}
              </div>
            );
          })}
        </div>

        <div className="border-t pt-4 space-y-2">
          <h4 className="font-medium">Common Issues & Solutions:</h4>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li><strong>Authentication Error:</strong> Check if your API key is correct and hasn't expired</li>
            <li><strong>Model Not Found:</strong> Ensure your account has access to the selected model</li>
            <li><strong>Rate Limit:</strong> Wait a moment before trying again or upgrade your plan</li>
            <li><strong>Quota Exceeded:</strong> Check your billing details and add payment method</li>
            <li><strong>OpenAI o3-mini:</strong> Requires Tier 3+ account and gradual rollout access</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
} 