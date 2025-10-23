import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key-change-in-production';

export interface User {
  id: string;
  email: string;
  name?: string;
  provider: 'email' | 'google';
}

// In-memory storage (replace with database in production)
const users: Map<string, { email: string; password: string; name?: string }> = new Map();
const sessions: Map<string, User> = new Map();

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createUser(email: string, password: string, name?: string): Promise<User> {
  if (users.has(email)) {
    throw new Error('User already exists');
  }

  const hashedPassword = await hashPassword(password);
  users.set(email, { email, password: hashedPassword, name });

  const user: User = {
    id: email,
    email,
    name,
    provider: 'email',
  };

  return user;
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const user = users.get(email);
  if (!user) {
    return null;
  }

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    return null;
  }

  return {
    id: email,
    email,
    name: user.name,
    provider: 'email',
  };
}

export function generateToken(user: User): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): User | null {
  try {
    return jwt.verify(token, JWT_SECRET) as User;
  } catch {
    return null;
  }
}

export function createSession(user: User): string {
  const token = generateToken(user);
  sessions.set(token, user);
  return token;
}

export function getSession(token: string): User | null {
  return sessions.get(token) || null;
}

export function deleteSession(token: string): void {
  sessions.delete(token);
}
