"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { getBookDetails, getCoverUrl } from "@/services/openLibraryService";
import { Book } from "@/types";

import styles from "./BookDetail.module.scss";

const BookDetailPage = () => {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBookDetails(id);
        setBook(data);
      } catch (err) {
        console.error("Error cargando libro:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return <p style={{ padding: "20px" }}>Cargando libro...</p>;
  }

  if (!book) {
    return <p style={{ padding: "20px" }}>Libro no encontrado</p>;
  }

  return (
    <div className={styles.container}>
      {/* 📚 PORTADA */}
      <img src={getCoverUrl(book.coverId, "L")} />

      {/* 📝 INFO */}
      <div className={styles.info}>
        <h1 className={styles.title}>{book.title}</h1>

        <p className={styles.authors}>
          {book.authors.join(", ")}
        </p>

        {book.firstPublishYear && (
          <p className={styles.year}>
            Año: {book.firstPublishYear}
          </p>
        )}

        {book.description && (
          <p className={styles.description}>
            {book.description}
          </p>
        )}

        {book.subjects && book.subjects.length > 0 && (
          <div className={styles.subjects}>
            {book.subjects.map((s, i) => (
              <span key={i} className={styles.tag}>
                {s}
              </span>
            ))}
          </div>
        )}

        {/* 🔗 BOTONES */}
        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          {book.openLibraryUrl && (
            <a
              href={book.openLibraryUrl}
              target="_blank"
              className={styles.link}
            >
              Ver en OpenLibrary
            </a>
          )}

          <button
            onClick={() => router.back()}
            className={styles.backButton}
          >
            ← Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;

