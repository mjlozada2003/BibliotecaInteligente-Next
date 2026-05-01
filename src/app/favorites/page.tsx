// src/app/favorites/page.tsx
'use client';
import { useRouter } from 'next/navigation';
import { useFavorites } from '@/hooks/useFavorites';
import { BookCard } from '@/components/BookCard/BookCard';
import styles from './page.module.scss';

export default function FavoritesPage() {
  const router = useRouter();
  const { favoriteBooks, toggle, isFav } = useFavorites();

  if (favoriteBooks.length === 0) {
    return (
      <div className={styles.container}>
        <h1>❤️ Mis Favoritos</h1>
        <p>Libros guardados para consultar más tarde</p>
        <div className={styles.empty}>
          <p>No tienes libros favoritos aún</p>
          <p>Explora la biblioteca y agrega libros a tu lista de favoritos</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>❤️ Mis Favoritos</h1>
      <p>Libros guardados para consultar más tarde</p>
      <div className={styles.grid}>
        {favoriteBooks
          .filter(book => book?.workId) // ✅ evita elementos sin workId
          .map(book => (
            <BookCard
              key={book.workId}
              book={book}
              onFavoriteToggle={() => toggle(book)}
              isFavorite={isFav(book.workId)}
              onViewDetail={(workId) => router.push(`/bookDetail/${workId}`)}
            />
          ))}
      </div>
    </div>
  );
}