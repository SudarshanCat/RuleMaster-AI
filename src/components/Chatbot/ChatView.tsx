import React, { useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { type Chat } from './ChatbotPage';
import { ChatMessage, TypingIndicator } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { Bot } from 'lucide-react';

interface ChatViewProps { chat: Chat | undefined; isLoading: boolean; onSendMessage: (prompt: string) => void; }

export const ChatView: React.FC<ChatViewProps> = ({ chat, isLoading, onSendMessage }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [chat?.messages, isLoading]);

  if (!chat) {
    return (
      <div className="welcome-view">
        <Bot size={64} className="welcome-icon" />
        <h2>AI Rule Architect</h2>
        <p>Start a new chat to define your business rules.</p>
      </div>
    );
  }
  return (
    <div className="chat-view">
      <div ref={scrollRef} className="message-list">
        <AnimatePresence initial={false}>
          {chat.messages.map((msg) => (<ChatMessage key={msg.id} message={msg} />))}
        </AnimatePresence>
        {isLoading && <TypingIndicator />}
      </div>
      <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
    </div>
  );
};