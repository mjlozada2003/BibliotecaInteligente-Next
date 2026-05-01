"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SearchResults } from "@/components/SearchResults/SearchResults";
import SearchBar from "@/components/SearchBar/SearchBar";
import AdvancedSearch from "@/components/AdvancedSearch/AdvancedSearch";
import { Book } from "@/types";
import { searchBooks } from "@/services/openLibraryService";
import { useFavorites } from "@/hooks/useFavorites";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/Loading/Loading";
import { ErrorMessage } from "@/components/ErrorMessage/ErrorMessage";

const SearchPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const { toggle, isFav } = useFavorites();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchBooks = async (params: any) => {
    setLoading(true);
    setError(null);
    try {
      const { books } = await searchBooks(
        typeof params === "string" ? { q: params } : params
      );
      setBooks(books);
    } catch (err) {
      console.error("Error buscando libros:", err);
      setError(err instanceof Error ? err : new Error("Error en la búsqueda"));
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      fetchBooks(query);
    }
  }, [query]);

  const handleViewDetail = (workId: string, coverId?: number) => {
  const url = coverId ? `/bookDetail/${workId}?coverId=${coverId}` : `/bookDetail/${workId}`;
  router.push(url);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>Resultados de búsqueda</h1>

      <SearchBar onSearch={fetchBooks} />
      <AdvancedSearch onSearch={fetchBooks} />

      {loading && <Loading size="medium" text="Buscando libros..." />}
      {error && <ErrorMessage onRetry={() => fetchBooks(query)} error={error} />}
      {!loading && !error && (
        <SearchResults
          books={books}
          onFavoriteToggle={toggle}
          isFavorite={isFav}
          onViewDetail={handleViewDetail}
        />
      )}
    </div>
  );
};

export default SearchPage;