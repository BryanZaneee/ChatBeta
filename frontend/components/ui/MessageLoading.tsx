import { useEffect, useState } from 'react';
import { useModelStore } from '@/frontend/stores/ModelStore';
import { isReasoningModel } from '@/lib/models';
import { Brain, Sparkles, Loader2 } from 'lucide-react';

interface MessageLoadingProps {
  startTime?: number;
}

export default function MessageLoading({ startTime }: MessageLoadingProps) {
  const selectedModel = useModelStore((state) => state.selectedModel);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [thinkingPhase, setThinkingPhase] = useState(0);
  const isReasoning = isReasoningModel(selectedModel);

  const thinkingMessages = [
    'Thinking...',
    'Analyzing your request...',
    'Processing complex reasoning...',
    'Working through the problem...',
    'Considering multiple approaches...',
  ];

  useEffect(() => {
    if (!startTime) return;
    
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  useEffect(() => {
    if (!isReasoning) return;
    
    const phaseInterval = setInterval(() => {
      setThinkingPhase((prev) => (prev + 1) % thinkingMessages.length);
    }, 2000);

    return () => clearInterval(phaseInterval);
  }, [isReasoning, thinkingMessages.length]);

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  if (isReasoning) {
    return (
      <div className="flex items-start gap-4 max-w-3xl w-full">
        <div className="flex flex-col items-center gap-2 mt-1">
          <div className="relative">
            <Brain className="w-6 h-6 text-blue-500 animate-pulse" />
            <div className="absolute -top-1 -right-1">
              <Sparkles className="w-3 h-3 text-yellow-500 animate-bounce" />
            </div>
          </div>
          {startTime && elapsedTime > 0 && (
            <div className="text-xs text-muted-foreground font-mono">
              {formatTime(elapsedTime)}
            </div>
          )}
        </div>
        
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {selectedModel}
            </span>
            <span className="text-xs text-muted-foreground">
              is reasoning
            </span>
          </div>
          
          <div className="text-sm text-muted-foreground italic">
            {thinkingMessages[thinkingPhase]}
          </div>
          
          <div className="flex gap-1 mt-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 text-muted-foreground">
      <Loader2 className="w-4 h-4 animate-spin" />
      <span className="text-sm">
        {selectedModel} is responding...
      </span>
      {startTime && elapsedTime > 0 && (
        <span className="text-xs font-mono">
          {formatTime(elapsedTime)}
        </span>
      )}
    </div>
  );
}
