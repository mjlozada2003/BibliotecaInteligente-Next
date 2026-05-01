import React from 'react';
import { Book } from '@/types';
import { BookCard } from '@/components/BookCard/BookCard';
import SkeletonCard from '@/components/SkeletonCard/SkeletonCard';
import styles from './BookGrid.module.scss';

interface BookGridProps {
  books: Book[];
  isLoading: boolean;
  isFavorite: (workId: string) => boolean;
  onFavoriteToggle: (book: Book) => void;
  onViewDetail: (workId: string) => void;
  skeletonCount?: number;
}

export const BookGrid: React.FC<BookGridProps> = ({
  books,
  isLoading,
  isFavorite,
  onFavoriteToggle,
  onViewDetail,
  skeletonCount = 8,
}) => {
  if (isLoading) {
    return (
      <div className={styles.grid}>
        {Array.from({ length: skeletonCount }).map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </div>
    );
  }

  if (books.length === 0) {
    return <p className={styles.empty}>No se encontraron libros.</p>;
  }

  return (
    <div className={styles.grid}>
      {books.map((book) => (
        <BookCard
          key={book.workId}
          book={book}
          isFavorite={isFavorite(book.workId)}
          onFavoriteToggle={() => onFavoriteToggle(book)}
          onViewDetail={onViewDetail}
        />
      ))}
    </div>
  );
};