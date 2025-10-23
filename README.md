# Talk to Books

A web-based application that allows users to have AI-powered conversations with books. Built with Next.js, TypeScript, and OpenAI API.

## Features

- **Book Library**: Browse a collection of 5 pre-loaded books with detailed information
- **AI Chat Interface**: Have conversations with books using GPT-4-Turbo
- **Semantic Search**: Uses text embeddings to find relevant passages
- **User Authentication**: Login with email/password
- **Conversation History**: Stores last 5 conversations per book per user
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Rate Limiting**: Protects API from abuse

## Technologies

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: OpenAI API (GPT-4-Turbo, Text Embeddings)
- **Authentication**: Custom JWT-based auth with bcrypt

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   Create a `.env` file with:
   ```
   OPENAI_API_KEY=your_openai_api_key
   NEXTAUTH_SECRET=your_secret_key
   NEXTAUTH_URL=http://localhost:3000
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

Deploy to Vercel:
```bash
vercel deploy --prod
```

Make sure to set environment variables in Vercel project settings.

## Books Included

1. Atomic Habits by James Clear
2. The Alchemist by Paulo Coelho
3. Rich Dad Poor Dad by Robert T. Kiyosaki
4. Thinking, Fast and Slow by Daniel Kahneman
5. The Power of Now by Eckhart Tolle

## Accessibility

- WCAG 2.1 AA compliant
- ARIA labels for interactive elements
- Keyboard navigation support
- Proper color contrast ratios

## Architecture

- **Frontend**: React components with Next.js App Router
- **Backend**: Next.js API routes
- **Storage**: In-memory (can be replaced with database)
- **AI Processing**: OpenAI embeddings for semantic search, GPT-4-Turbo for responses

## License

MIT
