import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const chatApi = {
  createSession: async (): Promise<string> => {
    const response = await api.post('/sessions');
    return response.data.sessionId;
  },

  sendMessage: async (sessionId: string, message: string) => {
    const response = await api.post('/chat', {
      sessionId,
      message
    });
    return response.data;
  },

  getHistory: async (sessionId: string) => {
    const response = await api.get(`/sessions/${sessionId}/history`);
    return response.data.messages;
  },

  clearSession: async (sessionId: string) => {
    const response = await api.delete(`/sessions/${sessionId}`);
    return response.data;
  }
};

export default api;