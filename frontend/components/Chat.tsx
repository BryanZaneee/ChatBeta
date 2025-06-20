import { useChat } from '@ai-sdk/react';
import Messages from './Messages';
import ChatInput from './ChatInput';
import ChatNavigator from './ChatNavigator';
import { UIMessage } from 'ai';
import { v4 as uuidv4 } from 'uuid';
import { createMessage } from '@/frontend/dexie/queries';
import { useModelStore } from '@/frontend/stores/ModelStore';
import { useSubscriptionStore } from '@/frontend/stores/SubscriptionStore';
import { isReasoningModel } from '@/lib/models';
import ThemeToggler from './ui/ThemeToggler';
import { SidebarTrigger, useSidebar } from './ui/sidebar';
import { Button } from './ui/button';
import { MessageSquareMore } from 'lucide-react';
import { useChatNavigator } from '@/frontend/hooks/useChatNavigator';
import { toast } from 'sonner';
import { useEffect, useState, useRef } from 'react';

interface ChatProps {
  threadId: string;
  initialMessages: UIMessage[];
}

export default function Chat({ threadId, initialMessages }: ChatProps) {
  const selectedModel = useModelStore((state) => state.selectedModel);
  const { incrementRegularMessages, incrementPremiumMessages } = useSubscriptionStore();
  const [requestStartTime, setRequestStartTime] = useState<number | null>(null);
  const isCurrentlyReasoning = isReasoningModel(selectedModel);
  const errorCountRef = useRef(0);

  const {
    isNavigatorVisible,
    handleToggleNavigator,
    closeNavigator,
    registerRef,
    scrollToMessage,
  } = useChatNavigator();

  const {
    messages,
    input,
    status,
    setInput,
    setMessages,
    append,
    stop,
    reload,
    error,
  } = useChat({
    id: threadId,
    initialMessages,
    experimental_throttle: 50,
    onFinish: async ({ parts }) => {
      let finalParts = parts || [];
      
      // Add timing information to reasoning parts if available
      if (isCurrentlyReasoning && requestStartTime && finalParts.length > 0) {
        const thinkingTime = Math.floor((Date.now() - requestStartTime) / 1000);
        finalParts = finalParts.map(part => {
          if (part.type === 'reasoning') {
            return { ...part, thinkingTime } as any;
          }
          return part;
        });
      }
      setRequestStartTime(null);

      // Track message usage - increment based on model type
      if (isCurrentlyReasoning) {
        incrementPremiumMessages();
      } else {
        incrementRegularMessages();
      }

      const aiMessage: UIMessage = {
        id: uuidv4(),
        parts: finalParts as UIMessage['parts'],
        role: 'assistant',
        content: '',
        createdAt: new Date(),
      };

      try {
        await createMessage(threadId, aiMessage);
      } catch (error) {
        console.error('Error saving message:', error);
        toast.error('Failed to save message to database');
      }
    },
    onError: (error) => {
      console.error('Chat error:', error);
      
      // Reset timing on error
      setRequestStartTime(null);
      
      // Increment error count and prevent excessive error handling
      errorCountRef.current++;
      if (errorCountRef.current > 3) {
        console.warn('Too many consecutive errors, stopping error handling');
        return;
      }
      
      // Enhanced error handling with user-friendly messages
      const errorMessage = error.message.toLowerCase();
      
      // Handle specific error types more gracefully
      if (errorMessage.includes('aborted') || errorMessage.includes('cancelled')) {
        // Don't show toast for user-cancelled requests
        return;
      }
      
      if (errorMessage.includes('network error') || errorMessage.includes('fetch failed')) {
        toast.error('Network connection issue. Please check your internet and try again.');
        return;
      }
      
      if (errorMessage.includes('api key') || errorMessage.includes('authentication')) {
        toast.error(`Authentication failed. Please check your API key in settings.`);
      } else if (errorMessage.includes('rate limit') || errorMessage.includes('429')) {
        toast.error('Rate limit exceeded. Please wait a moment before trying again.');
      } else if (errorMessage.includes('quota') || errorMessage.includes('billing')) {
        toast.error(`API quota exceeded. Please check your API billing details.`);
      } else if (errorMessage.includes('model') && errorMessage.includes('not found')) {
        if (selectedModel.includes('o3') || selectedModel.includes('o4-mini')) {
          toast.error('OpenAI reasoning models (o3, o4-mini) require a Tier 3+ account and may have limited availability. Try GPT-4.1 or GPT-4o instead.');
        } else if (selectedModel.includes('GPT-4.1')) {
          toast.error('GPT-4.1 models may not be available in your region or account tier. Try GPT-4o instead.');
        } else {
          toast.error(`Model "${selectedModel}" not found or not available. Check your account access.`);
        }
      } else if (errorMessage.includes('timeout')) {
        toast.error('Request timed out. Please try again with a shorter message.');
      } else if (errorMessage.includes('content') && errorMessage.includes('policy')) {
        toast.error('Content was blocked by safety policies. Please modify your message.');
      } else {
        // Generic error - be more conservative about showing details
        toast.error('An error occurred while processing your request. Please try again.');
      }
    },
    body: {
      model: selectedModel,
    },
  });

  // Track request timing for reasoning models
  useEffect(() => {
    if (status === 'submitted' && isCurrentlyReasoning) {
      setRequestStartTime(Date.now());
      errorCountRef.current = 0; // Reset error count on new request
    } else if (status === 'ready') {
      setRequestStartTime(null);
    }
  }, [status, isCurrentlyReasoning]);

  return (
    <div className="relative w-full min-h-screen">
      <ChatSidebarTrigger />
      <main
        className={`flex flex-col w-full max-w-3xl pt-10 pb-44 mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ease-in-out`}
      >
        <Messages
          threadId={threadId}
          messages={messages}
          status={status}
          setMessages={setMessages}
          reload={reload}
          error={error}
          registerRef={registerRef}
          stop={stop}
          startTime={requestStartTime}
        />
        <ChatInput
          threadId={threadId}
          input={input}
          status={status}
          append={append}
          setInput={setInput}
          stop={stop}
        />
      </main>
      <ThemeToggler />
      <Button
        onClick={handleToggleNavigator}
        variant="outline"
        size="icon"
        className="fixed right-16 top-4 z-20"
        aria-label={
          isNavigatorVisible
            ? 'Hide message navigator'
            : 'Show message navigator'
        }
      >
        <MessageSquareMore className="h-5 w-5" />
      </Button>

      <ChatNavigator
        threadId={threadId}
        scrollToMessage={scrollToMessage}
        isVisible={isNavigatorVisible}
        onClose={closeNavigator}
      />
    </div>
  );
}

const ChatSidebarTrigger = () => {
  const { state, isMobile } = useSidebar();
  
  // On mobile, always show the trigger (sidebar uses Sheet overlay)
  // On desktop, only show when sidebar is collapsed
  if (isMobile || state === 'collapsed') {
    return <SidebarTrigger className="fixed left-4 top-4 z-100" />;
  }
  return null;
};
