'use client';
import {useRouter} from 'next/navigation';
import { useFavorites } from '@/hooks/useFavorites';
import { BookCard } from '@/components/BookCard/BookCard';
import { useEffect, useState } from 'react';
import { getBookDetails } from '@/services/openLibraryService';
import {Book } from '@/types';
import styles from './page.module.scss';

export default function FavoritesPage(){
    const router = useRouter();
    const {favoriteIds, toggle, isFav} = useFavorites();
    const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = async () => {
            setLoading(true);
            const books= await Promise.all(
                favoriteIds.map(id => getBookDetails(id))
            );
            setFavoriteBooks(books.filter(Boolean) as Book[]);
            setLoading(false);
        };
        fetchFavorites();
    },    [favoriteIds]);

    if(loading) return <div> Cargando favoritos...</div>;
    return (
    <div className={styles.container}>
      <h1>❤️ Mis Favoritos</h1>
      <p>Libros guardados para consultar más tarde</p>
      {favoriteBooks.length === 0 ? (
        <div className={styles.empty}>
          <p>No tienes libros favoritos aún</p>
          <p>Explora la biblioteca y agrega libros a tu lista de favoritos</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {favoriteBooks.map(book => (
            <BookCard
              key={book.workId}
              book={book}
              onFavoriteToggle={toggle}
              isFavorite={isFav(book.workId)}
              onViewDetail={(workId) => router.push(`/libro/${workId}`)}
            />
          ))}
        </div>
      )}
    </div>
    );
}
