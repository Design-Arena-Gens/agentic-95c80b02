'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getBookById, type Book } from '@/lib/books';
import type { Message, Conversation } from '@/lib/storage';

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const bookId = params.bookId as string;

  const [book, setBook] = useState<Book | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const foundBook = getBookById(bookId);
    if (!foundBook) {
      router.push('/');
      return;
    }
    setBook(foundBook);
    loadConversations();
    createNewConversation();
  }, [bookId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadConversations = async () => {
    try {
      const response = await fetch(`/api/conversations?bookId=${bookId}`);
      if (response.ok) {
        const data = await response.json();
        setConversations(data.conversations || []);
      }
    } catch (err) {
      console.error('Failed to load conversations:', err);
    }
  };

  const createNewConversation = async () => {
    try {
      const response = await fetch('/api/conversations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId }),
      });

      if (response.ok) {
        const data = await response.json();
        setConversationId(data.conversationId);
        setMessages([]);
      }
    } catch (err) {
      console.error('Failed to create conversation:', err);
    }
  };

  const loadConversation = (conv: Conversation) => {
    setConversationId(conv.id);
    setMessages(conv.messages);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading || !conversationId) return;

    const userMessage = input.trim();
    setInput('');
    setError('');
    setLoading(true);

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, newUserMessage]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookId,
          message: userMessage,
          conversationId,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to get response');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      // Remove the user message if there was an error
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  if (!book) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/')}
                className="text-primary hover:text-blue-600 transition-colors"
                aria-label="Back to library"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <div>
                <h1 className="text-xl font-bold text-text">{book.title}</h1>
                <p className="text-sm text-secondary">{book.author}</p>
              </div>
            </div>
            <button
              onClick={createNewConversation}
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-blue-600 transition-colors"
              aria-label="New conversation"
            >
              New Chat
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar with conversation history */}
        {conversations.length > 0 && (
          <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto hidden md:block">
            <div className="p-4">
              <h2 className="text-sm font-semibold text-secondary uppercase mb-2">
                Recent Chats
              </h2>
              <div className="space-y-2">
                {conversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => loadConversation(conv)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      conv.id === conversationId
                        ? 'bg-primary text-white'
                        : 'bg-gray-50 text-text hover:bg-gray-100'
                    }`}
                  >
                    <div className="text-sm font-medium truncate">
                      {conv.messages[0]?.content.substring(0, 30) || 'New conversation'}
                    </div>
                    <div className="text-xs opacity-70 mt-1">
                      {new Date(conv.updatedAt).toLocaleDateString()}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        )}

        {/* Chat area */}
        <main className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <div className="max-w-3xl mx-auto space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-text mb-2">
                    Ask me anything about {book.title}
                  </h2>
                  <p className="text-secondary">
                    I'll answer based on the book's content and the author's perspective
                  </p>
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-userBubble text-text'
                        : 'bg-white text-text shadow-sm border border-gray-100'
                    }`}
                  >
                    <p className="whitespace-pre-wrap" style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {error && (
            <div className="px-4 py-2 bg-red-50 border-t border-red-200">
              <div className="max-w-3xl mx-auto">
                <p className="text-red-600 text-sm" role="alert">{error}</p>
              </div>
            </div>
          )}

          <div className="border-t border-gray-200 bg-white px-4 py-4">
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={`Ask ${book.title} a question...`}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}
                  disabled={loading}
                  aria-label="Message input"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
