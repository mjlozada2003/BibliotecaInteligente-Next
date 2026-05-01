'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getBookDetails } from '@/services/openLibraryService';
import { getCoverUrl } from '@/services/openLibraryService';
import { useFavorites } from '@/hooks/useFavorites';
import { Book } from '@/types';
import { Loading } from '@/components/Loading/Loading';
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage';
import DetailView from '@/components/DetailView/DetailView';

export default function BookDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const workId = params.workId as string;
  const coverId = searchParams.get('coverId') ? Number(searchParams.get('coverId')) : undefined;

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toggle, isFav } = useFavorites();

  useEffect(() => {
    if (!workId) return;

    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getBookDetails(workId);
        if (!data) throw new Error('Libro no encontrado');
        // Añadimos el coverId desde la URL (si viene) para mostrar portada
        setBook({ ...data, coverId });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error al cargar detalles'));
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [workId, coverId]);

  if (loading) return <Loading size="large" text="Cargando detalles del libro..." />;
  if (error) return <ErrorMessage onRetry={() => window.location.reload()} error={error} />;
  if (!book) return <ErrorMessage title="Libro no encontrado" message="No se pudo encontrar el libro solicitado." />;

  return (
    <DetailView
      book={book}
      isFavorite={isFav(book.workId)}
      onFavoriteToggle={() => toggle(book)}
    />
  );
}