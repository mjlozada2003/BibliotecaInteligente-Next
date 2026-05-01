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

const SearchPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const { toggle, isFav } = useFavorites();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBooks = async (params: any) => {
    setLoading(true);
    try {
      const { books } = await searchBooks(
        typeof params === "string" ? { q: params } : params
      );
      setBooks(books);
    } catch (err) {
      console.error("Error buscando libros:", err);
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

  const handleViewDetail = (workId: string) => {
    router.push(`/bookDetail/${workId}`);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>Resultados de búsqueda</h1>

      <SearchBar onSearch={fetchBooks} />
      <AdvancedSearch onSearch={fetchBooks} />

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <SearchResults
          books={books}
          onFavoriteToggle={toggle}        // ✅ Corrección: pasar toggle directamente
          isFavorite={isFav}               // ✅ función que verifica favorito por workId
          onViewDetail={handleViewDetail}
        />
      )}
    </div>
  );
};

export default SearchPage;