import { ArrowUpIcon } from 'lucide-react';
import { memo, useCallback, useMemo, useState, useEffect } from 'react';
import { Textarea } from '@/frontend/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Button } from '@/frontend/components/ui/button';
import useAutoResizeTextarea from '@/hooks/useAutoResizeTextArea';
import { UseChatHelpers, useCompletion } from '@ai-sdk/react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { createMessage, createThread } from '@/frontend/dexie/queries';
import { useModelStore } from '@/frontend/stores/ModelStore';
import { useSubscriptionStore } from '@/frontend/stores/SubscriptionStore';
import { getModelConfig, isReasoningModel } from '@/lib/models';
import { UIMessage } from 'ai';
import { v4 as uuidv4 } from 'uuid';
import { StopIcon } from './ui/icons';
import { toast } from 'sonner';
import { useMessageSummary } from '../hooks/useMessageSummary';
import ModelSelectorDropdown from './ModelSelectorDropdown';
import useResponsiveWidth from '@/hooks/useResponsiveWidth';
import { useSidebar } from './ui/sidebar';

interface ChatInputProps {
  threadId: string;
  input: UseChatHelpers['input'];
  status: UseChatHelpers['status'];
  setInput: UseChatHelpers['setInput'];
  append: UseChatHelpers['append'];
  stop: UseChatHelpers['stop'];
}

interface StopButtonProps {
  stop: UseChatHelpers['stop'];
}

interface SendButtonProps {
  onSubmit: () => void;
  disabled: boolean;
}

const createUserMessage = (id: string, text: string): UIMessage => ({
  id,
  parts: [{ type: 'text', text }],
  role: 'user',
  content: text,
  createdAt: new Date(),
});

function PureChatInput({
  threadId,
  input,
  status,
  setInput,
  append,
  stop,
}: ChatInputProps) {
  const selectedModel = useModelStore((state) => state.selectedModel);
  const { 
    messageCounts, 
    getRegularMessageLimit, 
    getPremiumMessageLimit,
    checkAndResetIfNeeded 
  } = useSubscriptionStore();

  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 72,
    maxHeight: 200,
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const isSmallScreen = useResponsiveWidth(768);
  const { state, isMobile } = useSidebar();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width on resize for dynamic positioning
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const debouncedHandleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 50); // Debounce for 50ms for smoother performance
    };

    window.addEventListener('resize', debouncedHandleResize);
    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const canSendMessage = useMemo(() => {
    checkAndResetIfNeeded();
    const isReasoning = isReasoningModel(selectedModel);
    const regularLimit = getRegularMessageLimit();
    const premiumLimit = getPremiumMessageLimit();
    
    if (isReasoning) {
      return messageCounts.premiumMessages < premiumLimit;
    } else {
      return messageCounts.regularMessages < regularLimit;
    }
  }, [selectedModel, messageCounts, getRegularMessageLimit, getPremiumMessageLimit, checkAndResetIfNeeded]);

  const isDisabled = useMemo(
    () => !input.trim() || status === 'streaming' || status === 'submitted' || !canSendMessage,
    [input, status, canSendMessage]
  );

  const { complete } = useMessageSummary();

  const handleSubmit = useCallback(async () => {
    const currentInput = textareaRef.current?.value || input;

    if (
      !currentInput.trim() ||
      status === 'streaming' ||
      status === 'submitted'
    ) return;

    if (!canSendMessage) {
      const isReasoning = isReasoningModel(selectedModel);
      if (isReasoning) {
        toast.error('Premium message limit reached. Upgrade or wait for monthly reset.');
      } else {
        toast.error('Message limit reached. Upgrade for higher limits or wait for monthly reset.');
      }
      return;
    }

    const messageId = uuidv4();

    if (!id) {
      navigate(`/chat/${threadId}`);
      await createThread(threadId);
      complete(currentInput.trim(), {
        body: { threadId, messageId, isTitle: true },
      });
    } else {
      complete(currentInput.trim(), { body: { messageId, threadId } });
    }

    const userMessage = createUserMessage(messageId, currentInput.trim());
    await createMessage(threadId, userMessage);

    append(userMessage);
    setInput('');
    adjustHeight(true);
  }, [
    input,
    status,
    setInput,
    adjustHeight,
    append,
    id,
    textareaRef,
    threadId,
    complete,
    canSendMessage,
    selectedModel,
  ]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    adjustHeight();
  };

  // Calculate positioning based on sidebar state
  const containerStyles = useMemo(() => {
    const sidebarWidth = 224; // 14rem = 224px (reduced from 19rem/304px)
    const rightMargin = 10; // 10px as requested
    const maxContentWidth = 768; // 3xl = 48rem = 768px
    
    if (isMobile || state === 'collapsed') {
      // On mobile or when sidebar is collapsed, use full width
      return {
        left: '0',
        right: `${rightMargin}px`,
        width: 'auto',
        maxWidth: 'none'
      };
    } else {
      // On desktop with expanded sidebar, calculate available width
      const availableWidth = windowWidth - sidebarWidth - rightMargin;
      const shouldShrink = availableWidth < maxContentWidth + 64; // Add padding buffer
      
      return {
        left: `${sidebarWidth}px`,
        right: `${rightMargin}px`,
        width: 'auto',
        maxWidth: shouldShrink ? `${availableWidth}px` : 'none'
      };
    }
  }, [isMobile, state, isSmallScreen, windowWidth]);

  return (
    <div 
      className="fixed bottom-0 flex justify-center transition-all duration-300 ease-in-out z-40"
      style={containerStyles}
    >
      <div className={cn(
        "w-full max-w-3xl mx-auto transition-all duration-300 ease-in-out",
        isSmallScreen ? "px-2 sm:px-4" : "px-4 sm:px-6 lg:px-8"
      )}>
        <div className="bg-secondary rounded-t-[20px] p-2 pb-0 w-full">
        <div className="relative">
          <div className="flex flex-col">
            <div className="bg-secondary overflow-y-auto max-h-[300px]">
              <Textarea
                id="chat-input"
                value={input}
                placeholder="What can I do for you?"
                className={cn(
                  'w-full border-none shadow-none dark:bg-transparent',
                  'placeholder:text-muted-foreground resize-none',
                  'focus-visible:ring-0 focus-visible:ring-offset-0',
                  'scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground/30',
                  'scrollbar-thumb-rounded-full',
                  'min-h-[72px] transition-all duration-200 ease-in-out',
                  isSmallScreen ? 'px-3 py-2 text-sm' : 'px-4 py-3 text-base'
                )}
                ref={textareaRef}
                onKeyDown={handleKeyDown}
                onChange={handleInputChange}
                aria-label="Chat message input"
                aria-describedby="chat-input-description"
              />
              <span id="chat-input-description" className="sr-only">
                Press Enter to send, Shift+Enter for new line
              </span>
            </div>

            <div className={cn(
              "flex items-center transition-all duration-200 ease-in-out",
              isSmallScreen ? "h-12 px-1" : "h-14 px-2"
            )}>
              <div className="flex items-center justify-between w-full">
                <ChatModelSelector />

                {status === 'submitted' || status === 'streaming' ? (
                  <StopButton stop={stop} />
                ) : (
                  <SendButton onSubmit={handleSubmit} disabled={isDisabled} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

const ChatInput = memo(PureChatInput, (prevProps, nextProps) => {
  if (prevProps.input !== nextProps.input) return false;
  if (prevProps.status !== nextProps.status) return false;
  return true;
});

const ChatModelSelector = memo(() => {
  return <ModelSelectorDropdown />;
});

function PureStopButton({ stop }: StopButtonProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={stop}
      aria-label="Stop generating response"
    >
      <StopIcon size={20} />
    </Button>
  );
}

const StopButton = memo(PureStopButton);

const PureSendButton = ({ onSubmit, disabled }: SendButtonProps) => {
  return (
    <Button
      onClick={onSubmit}
      variant="default"
      size="icon"
      disabled={disabled}
      aria-label="Send message"
      className="bg-blue-600 text-white active:bg-blue-500 focus:bg-blue-500 transition-colors duration-200 dark:bg-blue-700 dark:active:bg-blue-600 dark:focus:bg-blue-600 disabled:bg-muted"
    >
      <ArrowUpIcon size={18} />
    </Button>
  );
};

const SendButton = memo(PureSendButton, (prevProps, nextProps) => {
  return prevProps.disabled === nextProps.disabled;
});

export default ChatInput;
