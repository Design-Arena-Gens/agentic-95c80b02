import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import {
  getLatestConversations,
  createConversation,
  saveConversation,
} from '@/lib/storage';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    let userId = 'anonymous';
    if (token) {
      const user = getSession(token);
      if (user) {
        userId = user.id;
      }
    }

    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get('bookId');

    if (!bookId) {
      return NextResponse.json(
        { error: 'bookId is required' },
        { status: 400 }
      );
    }

    const conversations = getLatestConversations(userId, bookId, 5);

    return NextResponse.json({ conversations });
  } catch (error) {
    console.error('Get conversations error:', error);
    return NextResponse.json(
      { error: 'Failed to get conversations' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    let userId = 'anonymous';
    if (token) {
      const user = getSession(token);
      if (user) {
        userId = user.id;
      }
    }

    const { bookId } = await request.json();

    if (!bookId) {
      return NextResponse.json(
        { error: 'bookId is required' },
        { status: 400 }
      );
    }

    const conversation = createConversation(userId, bookId);
    saveConversation(conversation);

    return NextResponse.json({ conversationId: conversation.id });
  } catch (error) {
    console.error('Create conversation error:', error);
    return NextResponse.json(
      { error: 'Failed to create conversation' },
      { status: 500 }
    );
  }
}
