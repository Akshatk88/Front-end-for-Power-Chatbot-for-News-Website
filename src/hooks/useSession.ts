import { useState, useEffect } from 'react';
import { chatApi } from '../services/api';

export const useSession = () => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeSession = async () => {
      try {
        const newSessionId = await chatApi.createSession();
        setSessionId(newSessionId);
        localStorage.setItem('chatSessionId', newSessionId);
      } catch (error) {
        console.error('Failed to create session:', error);
      } finally {
        setLoading(false);
      }
    };

    // Check for existing session
    const savedSessionId = localStorage.getItem('chatSessionId');
    if (savedSessionId) {
      setSessionId(savedSessionId);
      setLoading(false);
    } else {
      initializeSession();
    }
  }, []);

  const clearSession = async () => {
    if (sessionId) {
      try {
        await chatApi.clearSession(sessionId);
        localStorage.removeItem('chatSessionId');
        setSessionId(null);
        
        // Create new session
        const newSessionId = await chatApi.createSession();
        setSessionId(newSessionId);
        localStorage.setItem('chatSessionId', newSessionId);
      } catch (error) {
        console.error('Failed to clear session:', error);
      }
    }
  };

  return {
    sessionId,
    loading,
    clearSession
  };
};