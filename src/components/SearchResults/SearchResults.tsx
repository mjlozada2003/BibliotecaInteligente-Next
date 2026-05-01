import { Book } from "@/types";
import { BookCard } from "../BookCard/BookCard";
import styles from "./SearchResults.module.scss";

interface SearchResultsProps {
  books: Book[];
  isFavorite: (workId: string) => boolean;
  onFavoriteToggle: (book: Book) => void;
  onViewDetail: (workId: string) => void;
}

export const SearchResults = ({
  books,
  isFavorite,
  onFavoriteToggle,
  onViewDetail,
}: SearchResultsProps) => {
  if (!books.length) return <p>No se encontraron resultados</p>;

  return (
    <div className={styles.grid}> {/* 🔥 AQUÍ */}
      {books.map((book) => (
        <BookCard
          key={book.workId}
          book={book}
          isFavorite={isFavorite(book.workId)}
          onFavoriteToggle={() => onFavoriteToggle(book)}
          onViewDetail={onViewDetail}
        />
      ))}
    </div>
  );
};