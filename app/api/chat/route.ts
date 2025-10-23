import { NextRequest, NextResponse } from 'next/server';
import { getOpenAIClient, generateEmbedding, cosineSimilarity } from '@/lib/openai';
import { getBookById } from '@/lib/books';
import { getSession } from '@/lib/auth';
import { getConversationById, saveConversation, addMessage } from '@/lib/storage';
import { cookies } from 'next/headers';

// Rate limiting: simple in-memory store
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10; // requests per window
const RATE_WINDOW = 60000; // 1 minute

function checkRateLimit(userId: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitStore.get(userId);

  if (!userLimit || now > userLimit.resetAt) {
    rateLimitStore.set(userId, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }

  if (userLimit.count >= RATE_LIMIT) {
    return false;
  }

  userLimit.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    let userId = 'anonymous';
    if (token) {
      const user = getSession(token);
      if (user) {
        userId = user.id;
      }
    }

    // Rate limiting
    if (!checkRateLimit(userId)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again in a minute.' },
        { status: 429 }
      );
    }

    const { bookId, message, conversationId } = await request.json();

    if (!bookId || !message || !conversationId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const book = getBookById(bookId);
    if (!book) {
      return NextResponse.json(
        { error: 'Book not found' },
        { status: 404 }
      );
    }

    // Get conversation
    const conversation = getConversationById(conversationId, userId);
    if (!conversation) {
      return NextResponse.json(
        { error: 'Conversation not found' },
        { status: 404 }
      );
    }

    // Generate embedding for user query
    const queryEmbedding = await generateEmbedding(message);

    // Get relevant passages from book chapters
    const passagesWithScores = await Promise.all(
      book.chapters.map(async (chapter) => {
        const chapterEmbedding = await generateEmbedding(chapter.content);
        const similarity = cosineSimilarity(queryEmbedding, chapterEmbedding);
        return {
          chapter: chapter.title,
          content: chapter.content,
          similarity,
        };
      })
    );

    // Sort by similarity and get top 2 passages
    const topPassages = passagesWithScores
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 2);

    // Build context from relevant passages
    const context = topPassages
      .map((p) => `From chapter "${p.chapter}":\n${p.content}`)
      .join('\n\n---\n\n');

    // Call OpenAI API
    const openai = getOpenAIClient();

    const systemPrompt = `You are an AI assistant representing the book "${book.title}" by ${book.author}.
Answer questions based on the book's content and respond in a tone that reflects the author's writing style.
Use the provided passages from the book to inform your answers. Be helpful, insightful, and stay true to the book's teachings.

Book Summary:
${book.summary}

Relevant passages:
${context}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        ...conversation.messages.slice(-4).map(m => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        })),
        { role: 'user', content: message },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const response = completion.choices[0]?.message?.content || 'I apologize, but I could not generate a response.';

    // Save messages to conversation
    addMessage(conversation, 'user', message);
    addMessage(conversation, 'assistant', response);
    saveConversation(conversation);

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process chat request' },
      { status: 500 }
    );
  }
}
