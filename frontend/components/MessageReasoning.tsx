import { memo, useState } from 'react';
import MemoizedMarkdown from './MemoizedMarkdown';
import { ChevronDownIcon, ChevronUpIcon, Brain, Clock } from 'lucide-react';

function PureMessageReasoning({
  reasoning,
  id,
  thinkingTime,
}: {
  reasoning: string;
  id: string;
  thinkingTime?: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatThinkingTime = (seconds: number) => {
    if (seconds < 60) {
      return `${seconds}s`;
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="flex flex-col gap-2 pb-2 max-w-3xl w-full">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-blue-600 dark:text-blue-400 cursor-pointer hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
      >
        <Brain className="w-4 h-4" />
        {isExpanded ? (
          <ChevronUpIcon className="w-4 h-4" />
        ) : (
          <ChevronDownIcon className="w-4 h-4" />
        )}
        <span className="font-medium">Reasoning</span>
        {thinkingTime && (
          <div className="flex items-center gap-1 text-muted-foreground text-xs">
            <Clock className="w-3 h-3" />
            <span>{formatThinkingTime(thinkingTime)}</span>
          </div>
        )}
      </button>
      {isExpanded && (
        <div className="p-4 rounded-md bg-blue-50 dark:bg-blue-950/20 text-xs border border-blue-200 dark:border-blue-800">
          <MemoizedMarkdown content={reasoning} id={id} size="small" />
        </div>
      )}
    </div>
  );
}

export default memo(PureMessageReasoning, (prev, next) => {
  return prev.reasoning === next.reasoning && prev.id === next.id && prev.thinkingTime === next.thinkingTime;
});
