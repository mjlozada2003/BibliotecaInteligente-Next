"use client";

import React from "react";
import { Book } from "../../types";
import { getCoverUrl } from "../../services/openLibraryService";
import styles from "./BookCard.module.scss";
import { useRouter } from "next/navigation";

interface BookCardProps {
  book: Book;
  onFavoriteToggle: (workId: string) => void;
  isFavorite: boolean;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  onFavoriteToggle,
  isFavorite,
}) => {
  const router = useRouter();

  const authors = Array.isArray(book.authors)
    ? book.authors
    : ["Autor desconocido"];

  const coverUrl = getCoverUrl(book.coverId, "M");

  return (
    <div className={styles.card}>
      <img
        src={coverUrl}
        alt={book.title}
        className={styles.cover}
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/placeholder-book.png";
        }}
      />

      <div className={styles.content}>
        <h3 className={styles.title}>{book.title || "Sin título"}</h3>

        <div className={styles.author}>{authors.join(", ")}</div>

        {book.firstPublishYear && (
          <div className={styles.year}>
            Año: {book.firstPublishYear}
          </div>
        )}

        {book.editionCount && (
          <div className={styles.editions}>
            {book.editionCount} ediciones
          </div>
        )}

        <div className={styles.actions}>
          <button
            className={`${styles.button} ${styles["button--primary"]}`}
            onClick={() => router.push(`/book/${book.workId}`)}
          >
            Ver detalle
          </button>

          <button
            className={`${styles.button} ${styles["button--secondary"]}`}
            onClick={() => onFavoriteToggle(book.workId)}
          >
            {isFavorite ? "❤️ Favorito" : "🤍 Agregar"}
          </button>
        </div>
      </div>
    </div>
  );
};