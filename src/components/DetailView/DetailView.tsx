import React from 'react';
import { useRouter } from 'next/navigation';
import { Book } from '@/types';
import { getCoverUrl } from '@/services/openLibraryService';
import styles from './DetailView.module.scss';

interface DetailViewProps {
  book: Book;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}

export default function DetailView({ book, isFavorite, onFavoriteToggle }: DetailViewProps) {
  const router = useRouter();
  const coverUrl = getCoverUrl(book.coverId, 'L');

  return (
    <div className={styles.container}>
      <button onClick={() => router.back()} className={styles.backButton}>
        ← Volver
      </button>

      <div className={styles.content}>
        <div className={styles.coverSection}>
          <img src={coverUrl} alt={book.title} className={styles.cover} />
          <button
            onClick={onFavoriteToggle}
            className={`${styles.favButton} ${isFavorite ? styles.isFav : ''}`}
          >
            {isFavorite ? '❤️ Eliminar de favoritos' : '🤍 Agregar a favoritos'}
          </button>
        </div>

        <div className={styles.infoSection}>
          <h1 className={styles.title}>{book.title}</h1>
          {book.authors && book.authors.length > 0 && (
            <p className={styles.authors}>
              <strong>Autor(es):</strong> {book.authors.join(', ')}
            </p>
          )}
          {book.firstPublishYear && (
            <p className={styles.year}>
              <strong>Primera publicación:</strong> {book.firstPublishYear}
            </p>
          )}
          {book.editionCount && (
            <p className={styles.editions}>
              <strong>Número de ediciones:</strong> {book.editionCount}
            </p>
          )}
          {book.description && (
            <div className={styles.description}>
              <strong>Descripción:</strong>
              <p>{book.description}</p>
            </div>
          )}
          {book.subjects && book.subjects.length > 0 && (
            <div className={styles.subjects}>
              <strong>Temas relacionados:</strong>
              <div className={styles.subjectList}>
                {book.subjects.slice(0, 10).map((subject, idx) => (
                  <span key={idx} className={styles.subjectTag}>{subject}</span>
                ))}
              </div>
            </div>
          )}
          {book.openLibraryUrl && (
            <a
              href={book.openLibraryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.openLibraryLink}
            >
              Ver en Open Library →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}