"use client";

import React, { useState, useEffect } from 'react';
import BookCard from '@/app/bookCard/BookCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://openlibrary.org/search.json?q=programming');
        const data = await response.json();
        setBooks(data.docs);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <p>Cargando libros...</p>;
  }

  return (
    <div>
      <h1>Libros Populares</h1>
      <div className="book-list">
        {books.map((book: any) => (
          <BookCard key={book.key} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Home;