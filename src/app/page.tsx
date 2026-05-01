"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { Book } from "@/types";
import { searchBooks } from "@/services/openLibraryService";   
import { BookCard } from "@/components/BookCard/BookCard";
import SearchBar from "@/components/SearchBar/SearchBar";
import { useFavorites } from "@/hooks/useFavorites";
import {useRouter} from "next/navigation";

const FILTERS = [
  "programming",
  "javascript",
  "database",
  "software engineering",
];

const Home = () => {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const {toggle, isFav} = useFavorites();
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("programming");

  const fetchBooks = async (query: string) => {
    setLoading(true);
    setActiveFilter(query);
    try {
      const { books } = await searchBooks({ q: query });
      setBooks(books);
    } catch (err) {
      console.error("Error:", err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks("programming");
  }, []);

  const handleViewDetail = (workId: string) => {
    router.push(`/bookDetail/${workId}`); // ✅ ruta en inglés
  };

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
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <div className={styles.grid}>
            {books.map((book) => (
              <BookCard
                key={book.workId}
                book={book}
                isFavorite={isFav(book.workId)}
                onFavoriteToggle={() => toggle(book)}
                onViewDetail={handleViewDetail}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;