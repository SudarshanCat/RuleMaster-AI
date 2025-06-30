import React from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import { type Message } from './ChatbotPage';

export const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
  const isBot = message.sender === 'bot';
  return (
    <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, type: 'spring' }}
      className={`chat-message-wrapper ${isBot ? 'bot' : 'user'}`}
    >
      <div className="avatar">{isBot ? <Bot size={20} /> : <User size={20} />}</div>
      <div className="chat-bubble"><ReactMarkdown>{message.text}</ReactMarkdown></div>
    </motion.div>
  );
};

export const TypingIndicator = () => (
    <motion.div className="chat-message-wrapper bot" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
        <div className="avatar"><Bot size={20} /></div>
        <div className="chat-bubble"><div className="typing-dots"><span></span><span></span><span></span></div></div>
    </motion.div>
);