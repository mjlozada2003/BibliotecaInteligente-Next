// src/components/BookCard/BookCard.tsx
import React from 'react';
import styles from './BookCard.module.scss';
import { Book } from '@/types';
import { getCoverUrl } from '@/services/openLibraryService';

interface BookCardProps {
  book: Book;
  onFavoriteToggle: (book: Book) => void;
  isFavorite: boolean;
  onViewDetail: (workId: string) => void;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  onFavoriteToggle,
  isFavorite,
  onViewDetail,
}) => {
  // ✅ Aseguramos que authors sea siempre un array
  const authors = Array.isArray(book.authors) ? book.authors : ['Autor desconocido'];
  const coverUrl = getCoverUrl(book.coverId, 'M');

  return (
    <div className={styles.card}>
      <img src={coverUrl} alt={book.title} className={styles.cover} />
      <div className={styles.content}>
        <h3 className={styles.title}>{book.title || 'Sin título'}</h3>
        <div className={styles.author}>{authors.join(', ')}</div>
        {book.firstPublishYear && (
          <div className={styles.year}>Año: {book.firstPublishYear}</div>
        )}
        {book.editionCount && (
          <div className={styles.editions}>{book.editionCount} ediciones</div>
        )}
        <div className={styles.actions}>
          <button
            className={`${styles.button} ${styles['button--primary']}`}
            onClick={() => onViewDetail(book.workId)}
          >
            Ver detalle
          </button>
          <button
            className={`${styles.button} ${styles['button--secondary']}`}
            onClick={() => onFavoriteToggle(book)}
          >
            {isFavorite ? '❤️ Favorito' : '🤍 Agregar'}
          </button>
        </div>
      </div>
    </div>
  );
};