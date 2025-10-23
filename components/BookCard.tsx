'use client';

import Link from 'next/link';
import { type Book } from '@/lib/books';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <Link href={`/chat/${book.id}`} className="group">
      <article
        className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:shadow-xl hover:-translate-y-1"
        aria-label={`Book: ${book.title} by ${book.author}`}
      >
        <div className="aspect-[3/4] bg-gray-200 overflow-hidden">
          <img
            src={book.coverImage}
            alt={`Cover of ${book.title}`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg text-text mb-1 line-clamp-2">
            {book.title}
          </h3>
          <p className="text-secondary text-sm mb-2">{book.author}</p>
          <p className="text-text text-sm line-clamp-2">{book.description}</p>
        </div>
      </article>
    </Link>
  );
}
