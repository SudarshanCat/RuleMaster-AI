import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, MessageSquare, Trash2, Sun, Moon, ArrowLeft, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { type Chat, type Theme } from './ChatbotPage';

interface SidebarProps {
  chats: Chat[]; activeChatId: string | null; onNewChat: () => void; onSelectChat: (id: string) => void;
  onDeleteChat: (id: string) => void; theme: Theme; setTheme: (theme: Theme) => void; isOpen: boolean; setIsOpen: (isOpen: boolean) => void;
}

export const ChatHistorySidebar: React.FC<SidebarProps> = ({ chats, activeChatId, onNewChat, onSelectChat, onDeleteChat, theme, setTheme, isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className={`sidebar-mobile-backdrop ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(false)} />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
            <button onClick={() => navigate('/dashboard')} className="sidebar-button back-button">
                <ArrowLeft size={20} /> Back
            </button>
            <button onClick={() => setIsOpen(false)} className="sidebar-button close-button">
                <X size={24} />
            </button>
        </div>
        <div className="sidebar-content">
          <button onClick={onNewChat} className="new-chat-button">
            <Plus size={18} /> New Rule Definition
          </button>
          <div className="chat-history-list">
            <AnimatePresence>
              {chats.map(chat => (
                <motion.div key={chat.id} layout initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20, transition: { duration: 0.15 } }}
                  className={`chat-history-item ${activeChatId === chat.id ? 'active' : ''}`}
                >
                  <button className="chat-select-button" onClick={() => onSelectChat(chat.id)}>
                    <MessageSquare size={16} />
                    <span>{chat.title}</span>
                  </button>
                  <button onClick={() => window.confirm('Are you sure?') && onDeleteChat(chat.id)} className="delete-chat-button">
                    <Trash2 size={16} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="sidebar-footer">
          <div className="theme-switcher">
            <button onClick={() => setTheme('light')} className={`theme-button ${theme === 'light' ? 'active' : ''}`} aria-label="Light theme"><Sun size={20} /></button>
            <button onClick={() => setTheme('dark')} className={`theme-button ${theme === 'dark' ? 'active' : ''}`} aria-label="Dark theme"><Moon size={20} /></button>
          </div>
        </div>
      </aside>
    </>
  );
};