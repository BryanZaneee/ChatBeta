import React, { useState, useMemo, useCallback } from 'react';
import { Search, Filter, X, Sparkles, FileText, Brain, Image, Zap, Globe, ChevronDown, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useModelStore } from '@/frontend/stores/ModelStore';
import { useAPIKeyStore } from '@/frontend/stores/APIKeyStore';
import { useSubscriptionStore } from '@/frontend/stores/SubscriptionStore';
import { AIModel, REASONING_MODELS, STANDARD_MODELS, getModelConfig, isReasoningModel } from '@/lib/models';
import { toast } from 'sonner';
import { Button } from '@/frontend/components/ui/button';
import { Input } from '@/frontend/components/ui/input';
import { Badge } from '@/frontend/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/frontend/components/ui/dropdown-menu';

interface ModelCapability {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const MODEL_CAPABILITIES: ModelCapability[] = [
  { id: 'fast', name: 'Fast', icon: Zap, description: 'Quick response times' },
  { id: 'imageGen', name: 'Image Generation', icon: Image, description: 'AI image creation' },
  { id: 'pdfs', name: 'PDFs', icon: FileText, description: 'PDF document processing' },
  { id: 'reasoning', name: 'Reasoning', icon: Brain, description: 'Advanced reasoning and problem solving' },
  { id: 'search', name: 'Search', icon: Globe, description: 'Web search and real-time information' },
  { id: 'vision', name: 'Vision', icon: Eye, description: 'Image understanding and analysis' },
];

// Model capability mapping
const getModelCapabilities = (model: AIModel): string[] => {
  const capabilities: string[] = [];
  
  // Fast models
  if (model.includes('Flash') || model.includes('Fast') || model.includes('mini')) {
    capabilities.push('fast');
  }
  
  // Reasoning models
  if (isReasoningModel(model)) {
    capabilities.push('reasoning');
  }
  
  // Vision models - based on memory of vision-enabled models
  const visionModels = [
    'Claude 4 Opus', 'Claude 4 Sonnet', 'Claude 3.7 Sonnet', 'Claude 3.5 Sonnet',
    'Gemini 2.5 Pro', 'Gemini 2.5 Flash',
    'GPT-4.1', 'GPT-4.1 Mini', 'GPT-4.1 Nano', 'GPT-4o', 'GPT-4o-mini'
  ];
  if (visionModels.some(visionModel => model.includes(visionModel))) {
    capabilities.push('vision');
  }
  
  // PDF processing (most models support this)
  capabilities.push('pdfs');
  
  // Search capability (simulated for demo)
  if (model.includes('Gemini') || model.includes('Claude') || model.includes('GPT')) {
    capabilities.push('search');
  }
  
  return capabilities;
};

// Function to get available models based on subscription tier
const getAvailableModels = (tier: 'free' | 'paid'): AIModel[] => {
  if (tier === 'free') {
    // Free tier: Only Gemini 2.5 Flash
    return ['Gemini 2.5 Flash'];
  }
  
  // Paid tier: All models
  // Ultra tier would include additional premium models in the future
  return [...REASONING_MODELS, ...STANDARD_MODELS];
};

interface ModelSelectorDropdownProps {
  trigger?: React.ReactNode;
}

export default function ModelSelectorDropdown({ trigger }: ModelSelectorDropdownProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  
  const { selectedModel, setModel } = useModelStore();
  const { getKey, isKeyValid, validateApiKey } = useAPIKeyStore();
  const { tier, isFreeTier, isPaidTier } = useSubscriptionStore();

  const isModelEnabled = useCallback(
    (model: AIModel) => {
      const modelConfig = getModelConfig(model);
      const apiKey = getKey(modelConfig.provider);
      const keyValid = isKeyValid(modelConfig.provider);
      return !!apiKey && keyValid;
    },
    [getKey, isKeyValid]
  );

  const getModelStatus = useCallback(
    (model: AIModel) => {
      const modelConfig = getModelConfig(model);
      const apiKey = getKey(modelConfig.provider);
      const keyValid = isKeyValid(modelConfig.provider);
      
      if (!apiKey) {
        return { status: 'no-key', message: `No ${modelConfig.provider} API key` };
      }
      if (!keyValid) {
        return { status: 'invalid-key', message: `Invalid ${modelConfig.provider} API key` };
      }
      return { status: 'available', message: 'Available' };
    },
    [getKey, isKeyValid]
  );

  const handleModelSelect = useCallback(
    (model: AIModel) => {
      const modelConfig = getModelConfig(model);
      const apiKey = getKey(modelConfig.provider);
      
      if (!apiKey) {
        toast.error(`Please add your ${modelConfig.provider} API key in settings to use ${model}`);
        return;
      }
      
      const validation = validateApiKey(modelConfig.provider, apiKey);
      if (!validation.isValid) {
        toast.error(`Invalid ${modelConfig.provider} API key: ${validation.error}`);
        return;
      }
      
      setModel(model);
      toast.success(`Switched to ${model}`);
      setOpen(false);
    },
    [getKey, validateApiKey, setModel]
  );

  const filteredModels = useMemo(() => {
    // Get models available for current tier
    const availableModels = getAvailableModels(tier);
    
    let filtered = availableModels.filter(model => {
      // Search filter
      if (searchQuery && !model.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Capability filters
      if (selectedFilters.length > 0) {
        const modelCapabilities = getModelCapabilities(model);
        return selectedFilters.every(filter => modelCapabilities.includes(filter));
      }
      
      return true;
    });
    
    // Show all toggle - when not showing all, prioritize specific default models
    if (!showAll) {
      const defaultModels: AIModel[] = [
        'Gemini 2.5 Flash',
        'Gemini 2.5 Pro', 
        'OpenAI o3',
        'OpenAI o4-mini',
        'Claude 4 Sonnet',
        'Deepseek R1 0528'
      ];
      
      // Get default models that exist in filtered results
      const prioritizedModels = defaultModels.filter(model => 
        filtered.includes(model as AIModel)
      );
      
      // Get remaining models not in defaults
      const remainingModels = filtered.filter(model => 
        !defaultModels.includes(model)
      );
      
      // Combine prioritized models first, then remaining models, limit to 6 total
      filtered = [...prioritizedModels, ...remainingModels].slice(0, 6);
    }
    
    return filtered;
  }, [searchQuery, selectedFilters, showAll, tier]);

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

    const defaultTrigger = trigger || (
    <Button
      variant="ghost"
      className="flex items-center gap-2 h-8 px-3 text-xs rounded-md text-foreground hover:bg-primary/10"
    >
      <span>{selectedModel}</span>
      <ChevronDown className="w-3 h-3 opacity-50" />
    </Button>
  );

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        {defaultTrigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-[450px] max-w-[90vw] max-h-[650px] p-0 overflow-hidden"
        align="start"
        side="top"
        sideOffset={8}
      >
        {/* Header with Search */}
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm">Model Selector</h3>
            <Badge variant={isFreeTier() ? "secondary" : "default"} className="text-xs">
              {tier.toUpperCase()}
            </Badge>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 h-8"
            />
          </div>
        </div>

        {/* Tier-based messaging */}
        {isFreeTier() && (
          <div className="mx-4 mb-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <p className="text-xs text-blue-700 dark:text-blue-300">
                Free tier: Gemini 2.5 Flash available. Upgrade for access to all models.
              </p>
            </div>
          </div>
        )}

        {/* Upgrade Banner */}
        <div className="mx-4 mb-3 bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-pink-500" />
              <div>
                <h4 className="font-semibold text-xs">Unlock all models + higher limits</h4>
                <p className="text-xs text-muted-foreground">$8/month</p>
              </div>
            </div>
            <Button size="sm" className="bg-pink-500 hover:bg-pink-600 text-white h-7 text-xs">
              Upgrade now
            </Button>
          </div>
        </div>

        {/* Models List */}
        <div className={cn(
          "px-4",
          showAll && "max-h-[400px] overflow-y-auto"
        )}>
          <div className="space-y-1 pb-2">
            {filteredModels.map((model) => {
              const isEnabled = isModelEnabled(model);
              const status = getModelStatus(model);
              const capabilities = getModelCapabilities(model);
              const isSelected = selectedModel === model;
              
              return (
                <button
                  key={model}
                  onClick={() => handleModelSelect(model)}
                  className={cn(
                    "w-full flex items-center justify-between p-2 rounded-md border transition-all text-left",
                    isSelected 
                      ? "border-blue-500 bg-blue-500/10" 
                      : "border-border hover:border-border/80 hover:bg-accent/50",
                    !isEnabled && "opacity-60"
                  )}
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="flex flex-col items-start flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={cn("text-sm font-medium truncate", !isEnabled && "text-muted-foreground")}>
                          {model}
                        </span>
                        {capabilities.includes('vision') && (
                          <Eye className="h-3 w-3 text-blue-500" />
                        )}
                      </div>
                      <div className="flex items-center gap-1 flex-wrap">
                        {capabilities.slice(0, 4).map((capId) => {
                          const capability = MODEL_CAPABILITIES.find(c => c.id === capId);
                          if (!capability) return null;
                          const Icon = capability.icon;
                          return (
                            <div 
                              key={capId}
                              className={cn(
                                "flex items-center gap-1 px-1 py-0.5 rounded text-xs",
                                selectedFilters.includes(capId) 
                                  ? "bg-blue-500/20 text-blue-600 dark:text-blue-400"
                                  : "bg-muted text-muted-foreground"
                              )}
                            >
                              <Icon className="h-2.5 w-2.5" />
                              <span className="text-xs">{capability.name}</span>
                            </div>
                          );
                        })}
                        {capabilities.length > 4 && (
                          <span className="text-xs text-muted-foreground">+{capabilities.length - 4}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 shrink-0">
                    {status.status === 'no-key' && (
                      <span className="text-xs text-red-500">⚠</span>
                    )}
                    {status.status === 'invalid-key' && (
                      <span className="text-xs text-red-500">❌</span>
                    )}
                    {status.status === 'available' && isEnabled && (
                      <span className="text-xs text-green-500">✓</span>
                    )}
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border px-4 py-3">
          <div className="flex items-center justify-between min-h-[40px]">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAll(!showAll)}
              className="text-xs h-7"
            >
              {showAll ? 'Show less' : 'Show all'}
            </Button>
            
            <DropdownMenu open={filterOpen} onOpenChange={setFilterOpen}>
              <DropdownMenuTrigger asChild>
                <Button 
                  size="sm" 
                  className={cn(
                    "relative h-7 text-xs",
                    selectedFilters.length > 0 && "bg-blue-500 hover:bg-blue-600"
                  )}
                >
                  <Filter className="h-3 w-3 mr-1" />
                  Filter
                  {selectedFilters.length > 0 && (
                    <Badge 
                      variant="secondary" 
                      className="ml-1 h-3 w-3 p-0 text-xs bg-white text-blue-600"
                    >
                      {selectedFilters.length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="start" 
                side="right" 
                sideOffset={25}
                className="w-48 -translate-y-13"
              >
                <div className="p-2">
                  <div className="text-xs font-medium text-muted-foreground mb-2">
                    Filter by capabilities
                  </div>
                  {MODEL_CAPABILITIES.map((capability) => {
                    const Icon = capability.icon;
                    const isSelected = selectedFilters.includes(capability.id);
                    return (
                      <DropdownMenuItem
                        key={capability.id}
                        onClick={() => toggleFilter(capability.id)}
                        className={cn(
                          "flex items-center gap-2 cursor-pointer",
                          isSelected && "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="text-sm">{capability.name}</span>
                        {isSelected && <div className="ml-auto w-2 h-2 rounded-full bg-blue-500" />}
                      </DropdownMenuItem>
                    );
                  })}
                  {selectedFilters.length > 0 && (
                    <>
                      <div className="my-2 h-px bg-border" />
                      <DropdownMenuItem
                        onClick={() => setSelectedFilters([])}
                        className="text-xs text-muted-foreground cursor-pointer"
                      >
                        Clear all filters
                      </DropdownMenuItem>
                    </>
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 