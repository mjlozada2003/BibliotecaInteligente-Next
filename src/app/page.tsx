"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { Book } from "@/types";
import { searchBooks } from "@/services/openLibraryService";
import { BookCard } from "@/components/BookCard/BookCard";
import SearchBar from "@/components/SearchBar/SearchBar";
import { useFavorites } from "@/hooks/useFavorites";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/Loading/Loading";
import { ErrorMessage } from "@/components/ErrorMessage/ErrorMessage";
import { BookGrid } from "@/components/BookGrid/BookGrid";

const FILTERS = [
  "programming",
  "javascript",
  "database",
  "software engineering",
];

const Home = () => {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const { toggle, isFav } = useFavorites();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [activeFilter, setActiveFilter] = useState("programming");

  const fetchBooks = async (query: string) => {
    setLoading(true);
    setError(null);
    setActiveFilter(query);
    try {
      const { books } = await searchBooks({ q: query });
      setBooks(books);
    } catch (err) {
      console.error("Error:", err);
      setError(err instanceof Error ? err : new Error("Error desconocido"));
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks("programming");
  }, []);

  const handleViewDetail = (workId: string, coverId?: number) => {
    const url = coverId ? `/bookDetail/${workId}?coverId=${coverId}` : `/bookDetail/${workId}`;
  router.push(url);
  };

  // ⏳ Estado de carga
  if (loading) return <Loading size="large" text="Cargando libros..." />;

  // ❌ Estado de error
  if (error) return <ErrorMessage onRetry={() => fetchBooks(activeFilter)} error={error} />;

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1>Biblioteca Digital UCB</h1>
        <p>Explora millones de libros</p>
        <SearchBar onSearch={fetchBooks} />
      </div>

      <div className={styles.filters}>
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => fetchBooks(filter)}
            className={activeFilter === filter ? styles.activeFilter : ""}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        <h2>Libros Populares</h2>
        <BookGrid
          books={books}
          isLoading={loading}
          isFavorite={isFav}
          onFavoriteToggle={toggle}
          onViewDetail={(workId) => handleViewDetail(workId, books.find(b => b.workId === workId)?.coverId)}
        />
      </div>
    </div>
  );
};

export default Home;