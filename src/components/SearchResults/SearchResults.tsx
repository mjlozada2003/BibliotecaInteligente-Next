import { Book } from "@/types";
import {BookCard} from "../BookCard/BookCard";
interface SearchResultsProps {
  books: Book[];
  favorites: string[];
  onFavoriteToggle: (id: string) => void;
  onViewDetail: (id: string) => void;
}

export const SearchResults = ({
  books,
  favorites,
  onFavoriteToggle,
  onViewDetail,
}: SearchResultsProps) => {
  if (!books.length) return <p>No se encontraron resultados</p>;

  return (
    <div>
      {books.map((book) => (
        <BookCard
          key={book.workId}
          book={book}
          isFavorite={favorites.includes(book.workId)}
          onFavoriteToggle={onFavoriteToggle}
          onViewDetail={onViewDetail}
        />
      ))}
    </div>
  );
};