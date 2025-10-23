export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface Conversation {
  id: string;
  bookId: string;
  userId: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

// In-memory storage (replace with database in production)
const conversations: Map<string, Conversation[]> = new Map();

export function getConversations(userId: string, bookId: string): Conversation[] {
  const key = `${userId}:${bookId}`;
  return conversations.get(key) || [];
}

export function getLatestConversations(userId: string, bookId: string, limit: number = 5): Conversation[] {
  const userConversations = getConversations(userId, bookId);
  return userConversations
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .slice(0, limit);
}

export function saveConversation(conversation: Conversation): void {
  const key = `${conversation.userId}:${conversation.bookId}`;
  const userConversations = conversations.get(key) || [];

  const existingIndex = userConversations.findIndex(c => c.id === conversation.id);
  if (existingIndex >= 0) {
    userConversations[existingIndex] = conversation;
  } else {
    userConversations.push(conversation);
  }

  conversations.set(key, userConversations);
}

export function createConversation(userId: string, bookId: string): Conversation {
  return {
    id: `${Date.now()}-${Math.random().toString(36).substring(7)}`,
    bookId,
    userId,
    messages: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

export function addMessage(conversation: Conversation, role: 'user' | 'assistant', content: string): Message {
  const message: Message = {
    id: `${Date.now()}-${Math.random().toString(36).substring(7)}`,
    role,
    content,
    timestamp: Date.now(),
  };

  conversation.messages.push(message);
  conversation.updatedAt = Date.now();

  return message;
}

export function getConversationById(conversationId: string, userId: string): Conversation | null {
  for (const [key, convs] of conversations.entries()) {
    if (key.startsWith(userId)) {
      const conv = convs.find(c => c.id === conversationId);
      if (conv) return conv;
    }
  }
  return null;
}
