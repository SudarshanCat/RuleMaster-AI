import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps { onSendMessage: (prompt: string) => void; isLoading: boolean; }

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
    const [prompt, setPrompt] = useState('');
    const handleSend = () => {
        if (prompt.trim() && !isLoading) { onSendMessage(prompt.trim()); setPrompt(''); }
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
    };
    return (
        <div className="chat-input-area">
            <div className="chat-input-wrapper">
                <TextareaAutosize value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={handleKeyDown}
                    placeholder="Describe a rule..." className="prompt-input" maxRows={8} disabled={isLoading}
                />
                <button onClick={handleSend} disabled={isLoading || !prompt.trim()} className="send-button" aria-label="Send message">
                    {isLoading ? <Loader2 className="spinner" size={20} /> : <Send size={20} />}
                </button>
            </div>
        </div>
    );
};