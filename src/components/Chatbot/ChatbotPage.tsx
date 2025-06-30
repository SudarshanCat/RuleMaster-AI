import React, { useState, useEffect, useCallback } from 'react';

import { Bot, Menu } from 'lucide-react';
import { ChatHistorySidebar } from './ChatHistorySidebar';
import { ChatView } from './ChatView';
import './Chatbot.css'; // The ONLY CSS file you will need for this.

// Type Definitions
export interface Message { id: string; text: string; sender: 'user' | 'bot'; }
export interface Chat { id: string; title: string; messages: Message[]; }
export type Theme = 'light' | 'dark';

const ChatbotPage: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>('light');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);

  // --- Effects for Persistence and Theming ---
  useEffect(() => {
    const savedChats = localStorage.getItem('chatbot_chats');
    const savedTheme = localStorage.getItem('chatbot_theme') as Theme | null;
    if (savedChats) setChats(JSON.parse(savedChats));
    if (savedTheme) setTheme(savedTheme);
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chatbot_chats', JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    // THIS IS THE NEW THEME LOGIC - IT'S MUCH SIMPLER
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('chatbot_theme', theme);
  }, [theme]);
  
  // --- Core Chat Logic ---
  const getActiveChat = useCallback(() => chats.find(c => c.id === activeChatId), [chats, activeChatId]);

  const handleNewChat = () => {
    const newChat: Chat = {
      id: `chat-${Date.now()}`,
      title: 'New Rule Chat',
      messages: [{ id: 'msg-initial', text: "Hello! How can I help you define a new business rule today?", sender: 'bot' }],
    };
    setChats(prev => [newChat, ...prev]);
    setActiveChatId(newChat.id);
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };
  
  const handleSelectChat = (chatId: string) => {
    setActiveChatId(chatId);
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const handleDeleteChat = (chatId: string) => {
    setChats(prev => prev.filter(c => c.id !== chatId));
    if (activeChatId === chatId) {
      const remainingChats = chats.filter(c => c.id !== chatId);
      setActiveChatId(remainingChats.length > 0 ? remainingChats[0].id : null);
    }
  };

  const addMessageToChat = (chatId: string, message: Message) => {
    setChats(prev => prev.map(c => c.id === chatId ? { ...c, messages: [...c.messages, message] } : c));
  };

  const handleSendMessage = useCallback(async (prompt: string) => {
    if (!activeChatId) return;
    const userMessage: Message = { id: `msg-${Date.now()}`, text: prompt, sender: 'user' };
    addMessageToChat(activeChatId, userMessage);
    setIsLoading(true);

    // Dummy API call for demonstration
    setTimeout(() => {
        const botResponseText = `Rule based on your request for "${prompt}":\n\n**IF** a customer is a 'VIP' **AND** order total > $100,\n**THEN** apply a 15% discount.`;
        const botMessage: Message = { id: `msg-${Date.now() + 1}`, text: botResponseText, sender: 'bot' };
        addMessageToChat(activeChatId, botMessage);
        setIsLoading(false);
    }, 2000);
  }, [activeChatId, chats]);

  return (
    <div className="chatbot-page-container">
      <ChatHistorySidebar
        chats={chats} activeChatId={activeChatId} onNewChat={handleNewChat} onSelectChat={handleSelectChat}
        onDeleteChat={handleDeleteChat} theme={theme} setTheme={setTheme} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}
      />
      <main className="main-content">
        <header className="main-header">
            <button onClick={() => setIsSidebarOpen(true)} className="sidebar-toggle">
                <Menu size={24} />
            </button>
            <div className="header-title">
                <Bot size={28} />
                <h1>AI Rule Architect</h1>
            </div>
        </header>
        <ChatView chat={getActiveChat()} isLoading={isLoading} onSendMessage={handleSendMessage} />
      </main>
    </div>
  );
};
export default ChatbotPage;