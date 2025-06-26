import React, { useState } from 'react';
import { XCircle, Send, Save, Loader2, Bot, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Chatbot.css'; // Dedicated CSS for ChatbotPage

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedRule, setGeneratedRule] = useState('');
  const [messageCounter, setMessageCounter] = useState(0); // To generate unique message IDs

  const navigate = useNavigate(); // Initialize navigate hook

  const addMessage = (text: string, sender: 'user' | 'bot') => {
    setMessageCounter(prev => prev + 1);
    setMessages(prev => [...prev, { id: prev.length + messageCounter, text, sender }]);
  };

  const handleDefineRule = async () => {
    if (!inputPrompt.trim()) {
      addMessage("Please enter a prompt to define a rule.", 'bot');
      return;
    }

    const userPrompt = inputPrompt.trim();
    addMessage(userPrompt, 'user');
    setInputPrompt(''); // Clear input immediately

    setIsLoading(true);
    addMessage("Thinking...", 'bot'); // Show thinking message

    try {
      const chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: `Define a business rule based on the following request:\n\n"${userPrompt}"\n\nProvide the rule in a clear, structured format, ready for implementation. Example: IF [condition] THEN [action].` }] });

      const payload = { contents: chatHistory };
      const apiKey = ""; // Canvas will provide this at runtime if empty
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      // Remove "Thinking..." message
      setMessages(prev => prev.slice(0, -1));

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const text = result.candidates[0].content.parts[0].text;
        setGeneratedRule(text); // Store for saving
        addMessage(text, 'bot');
      } else {
        addMessage("AI could not define the rule. Please try rephrasing your prompt.", 'bot');
        console.error("Unexpected API response structure:", result);
      }

    } catch (error) {
      // Remove "Thinking..." message
      setMessages(prev => prev.slice(0, -1));
      addMessage('An error occurred while defining the rule. Please check console.', 'bot');
      console.error('Error calling Gemini API for rule definition:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveRule = () => {
    if (!generatedRule) {
      addMessage("No rule to save yet. Please define a rule first.", 'bot');
      return;
    }
    console.log("Simulating saving the rule:", generatedRule);
    addMessage("Rule saved successfully! (Simulated)", 'bot');
    // In a real application, you would send generatedRule to your backend to save it.
  };

  return (
    <div className="chatbot-page-container">
      <div className="chatbot-header">
        <button onClick={() => navigate('/')} className="back-button">
          <ArrowLeft className="h-6 w-6" /> Back to Dashboard
        </button>
        <h2 className="title">
          <Bot className="h-8 w-8 mr-2" /> AI-Powered Rule Creation
        </h2>
      </div>

      <div className="chat-area">
        {messages.map(msg => (
          <div key={msg.id} className={`chat-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {isLoading && (
          <div className="chat-message bot loading-indicator">
            <Loader2 className="animate-spin h-5 w-5 mr-2 inline-block" /> AI is thinking...
          </div>
        )}
      </div>

      <div className="input-area">
        <textarea
          className="prompt-input"
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          placeholder="Describe the rule you want to define (e.g., 'Approve orders over $100 for VIP customers')..."
          rows={3}
          disabled={isLoading}
        ></textarea>
        <button
          onClick={handleDefineRule}
          disabled={isLoading || !inputPrompt.trim()}
          className="send-button"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>

      {generatedRule && !isLoading && (
        <div className="save-rule-section">
          <button onClick={handleSaveRule} className="save-button">
            <Save className="h-5 w-5 mr-2" /> Save Rule
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatbotPage;
