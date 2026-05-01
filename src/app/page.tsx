"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { Book } from "@/types";
import { searchBooks } from "@/services/openLibraryService";   
import { BookCard } from "@/components/BookCard/BookCard";
import SearchBar from "./searchBar/SearchBar";

const FILTERS = [
  "programming",
  "javascript",
  "database",
  "software engineering",
];

const Home = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("programming");

  // 🔹 favoritos
  const handleFavoriteToggle = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id]
    );
  };

  // 🔹 detalle
  const handleViewDetail = (id: string) => {
    console.log("Ver detalle:", id);
  };

  // 🔹 fetch centralizado
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

  // 🔹 carga inicial
  useEffect(() => {
    fetchBooks("programming");
  }, []);

  return (
    <div className={styles.page}>
      
      {/* 🔵 HERO */}
      <div className={styles.hero}>
        <h1>Biblioteca Digital UCB</h1>
        <p>Explora millones de libros</p>

        <SearchBar onSearch={fetchBooks} />
      </div>

      {/* 🎯 FILTROS */}
      <div className={styles.filters}>
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => fetchBooks(filter)}
            className={
              activeFilter === filter ? styles.activeFilter : ""
            }
          >
            {filter}
          </button>
        ))}
      </div>

      {/* 📚 LIBROS */}
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
                isFavorite={favorites.includes(book.workId)}
                onFavoriteToggle={handleFavoriteToggle}
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