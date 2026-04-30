"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.scss";
import BookCard from "@/app/bookCard/BookCard";

const Home = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          "https://openlibrary.org/search.json?q=programming"
        );
        const data = await response.json();
        setBooks(data.docs.slice(0, 20)); // 🔥 solo 20 para UI
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <p>Cargando libros...</p>;

  return (
    <div className={styles.page}>
      
      {/* 🔵 HERO */}
      <div className={styles.hero}>
        <h1>Biblioteca Digital UCB</h1>
        <p>Explora millones de libros</p>

        <div className={styles.searchBox}>
          <input placeholder="Buscar por título, autor..." />
          <button>Buscar</button>
        </div>
      </div>

      {/* 📚 LIBROS */}
      <div className={styles.content}>
        <h2 className={styles.sectionTitle}>Libros Populares</h2>

        <div className={styles.grid}>
          {books.map((book) => (
            <BookCard key={book.key} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;