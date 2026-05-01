'use client';
import { useRouter } from 'next/navigation';
import { useFavorites } from '@/hooks/useFavorites';
import { BookCard } from '@/components/BookCard/BookCard';
import styles from './page.module.scss';
import { Loading } from '@/components/Loading/Loading';
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage';
import { useState, useEffect } from 'react';

export default function FavoritesPage() {
  const router = useRouter();
  const { favoriteBooks, toggle, isFav } = useFavorites();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      // Simulamos un pequeño delay para mostrar loading (opcional)
      setTimeout(() => setLoading(false), 300);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Error al cargar favoritos"));
      setLoading(false);
    }
  }, []);

  if (loading) return <Loading size="medium" text="Cargando favoritos..." />;
  if (error) return <ErrorMessage message="No se pudieron cargar tus favoritos" />;

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
       {favoriteBooks.map(book => (
          <BookCard
            key={book.workId}
            book={book}
            onFavoriteToggle={() => toggle(book)}
            isFavorite={isFav(book.workId)}
            onViewDetail={(workId) => {
              const url = book.coverId ? `/bookDetail/${workId}?coverId=${book.coverId}` : `/bookDetail/${workId}`;
              router.push(url);
            }}
          />
        ))}
      </div>
    </div>
  );
}