"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SearchResults } from "@/components/SearchResults/SearchResults";
import SearchBar from "../searchBar/SearchBar";
import { Book } from "@/types";
import { searchBooks } from "@/services/openLibraryService";
import AdvancedSearch from "@/components/AdvancedSearch/AdvancedSearch";

const BuscarPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [books, setBooks] = useState<Book[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  //  Manejar favoritos
  const handleFavoriteToggle = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id]
    );
  };

  //  Ver detalle (por ahora simple)
  const handleViewDetail = (id: string) => {
    console.log("Ver detalle:", id);
    // luego puedes hacer router.push(`/book/${id}`)
  };

  //  Función reutilizable para buscar
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

  // Ejecutar búsqueda cuando cambia la URL
  useEffect(() => {
    if (query) {
      fetchBooks(query);
    }
  }, [query]);
return (
  <div>
    <h1>Resultados de búsqueda</h1>

    {/* 🔍 búsqueda simple */}
    <SearchBar onSearch={(q) => fetchBooks(q)} />

    {/* 🔥 búsqueda avanzada */}
    <AdvancedSearch onSearch={fetchBooks} />

    {/* 📚 resultados */}
    {loading ? (
      <p>Cargando...</p>
    ) : (
      <SearchResults
        books={books}
        favorites={favorites}
        onFavoriteToggle={handleFavoriteToggle}
        onViewDetail={handleViewDetail}
      />
    )}
  </div>
);
};

export default BuscarPage;