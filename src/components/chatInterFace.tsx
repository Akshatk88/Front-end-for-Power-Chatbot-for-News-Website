import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import InputBox from './InputBox';
import SessionControls from './SessionControls';
import { useChat } from '../hooks/useChat.ts';
import { useSession } from '../hooks/useSession';
import '../styles/ChatInterface.scss';

const ChatInterface: React.FC = () => {
  const { sessionId, loading: sessionLoading, clearSession } = useSession();
  const { messages, loading: chatLoading, sendMessage, loadHistory } = useChat(sessionId);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionId) {
      loadHistory();
    }
  }, [sessionId, loadHistory]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleResetSession = async () => {
    await clearSession();
  };

  return (
    <div className="chat-interface">
      <div className="chat-header">
        <h1>News RAG Chatbot</h1>
        <SessionControls
          sessionId={sessionId}
          onResetSession={handleResetSession}
          loading={sessionLoading}
        />
      </div>

      <div className="messages-container">
        {messages.length === 0 && !chatLoading && (
          <div className="welcome-message">
            <h3>Welcome to News RAG Chatbot!</h3>
            <p>Ask me questions about recent news articles. I'll search through my database of 50+ news articles to provide you with accurate information.</p>
          </div>
        )}
        
        {messages.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}
        
        {chatLoading && (
          <div className="loading-indicator">
            <div className="typing-animation">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <InputBox
          onSendMessage={sendMessage}
          disabled={chatLoading || sessionLoading}
          placeholder="Ask about recent news..."
        />
      </div>
    </div>
  );
};

export default ChatInterface;