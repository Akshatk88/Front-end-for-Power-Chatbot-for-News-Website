import { useState, useCallback } from 'react';
import { ChatMessage } from '../types';
import { chatApi } from '../services/api';

export const useChat = (sessionId: string | null) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadHistory = useCallback(async () => {
    if (!sessionId) return;

    try {
      const history = await chatApi.getHistory(sessionId);
      setMessages(history);
    } catch (err) {
      console.error('Failed to load chat history:', err);
    }
  }, [sessionId]);

  const sendMessage = useCallback(async (content: string) => {
    if (!sessionId || !content.trim()) return;

    setLoading(true);
    setError(null);

    // Add user message immediately
    const userMessage: ChatMessage = {
      role: 'user',
      content: content.trim(),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await chatApi.sendMessage(sessionId, content.trim());
      
      const botMessage: ChatMessage = {
        role: 'bot',
        content: response.answer,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Failed to send message';
      setError(errorMessage);
      
      // Add error message
      const errorBotMessage: ChatMessage = {
        role: 'bot',
        content: `Sorry, I encountered an error: ${errorMessage}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorBotMessage]);
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    loading,
    error,
    sendMessage,
    loadHistory,
    clearMessages
  };
};