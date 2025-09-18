export interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export interface Session {
  id: string;
  createdAt: Date;
  messages: ChatMessage[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}