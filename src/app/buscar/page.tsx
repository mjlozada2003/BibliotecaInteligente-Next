"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { SearchResults } from "@/components/SearchResults/SearchResults";
import SearchBar from "../searchBar/SearchBar";
import AdvancedSearch from "@/components/AdvancedSearch/AdvancedSearch";
import { parseSort } from "@/utils/searchHelpers";
import Pagination from "@/components/Pagination/Pagination";

import { Book } from "@/types";
import { searchBooks } from "@/services/openLibraryService";


const BuscarPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(searchParams.get("page") || 1);

  const [books, setBooks] = useState<Book[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Favoritos
  const handleFavoriteToggle = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id]
    );
  };

  // 🔹 Ver detalle
  const handleViewDetail = (id: string) => {
    console.log("Ver detalle:", id);
    // router.push(`/book/${id}`);
  };

  // 🔹 Construir query string
  const buildQueryString = (params: any) => {
    const query = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        query.set(key, String(value));
      }
    });

    return query.toString();
  };

  // 🔥 SOLO cambia la URL (NO hace fetch)
  const fetchBooks = (params: any) => {
    const finalParams =
      typeof params === "string" ? { q: params } : params;

    const queryString = buildQueryString(finalParams);

    if (queryString !== searchParams.toString()) {
      router.push(`/buscar?${queryString}`);
    }
  };

  // 🔹 Leer params desde URL
  const getParamsFromUrl = () => {
    return {
      q: searchParams.get("q") || undefined,
      title: searchParams.get("title") || undefined,
      author: searchParams.get("author") || undefined,
      subject: searchParams.get("subject") || undefined,
      minYear: searchParams.get("minYear")
        ? Number(searchParams.get("minYear"))
        : undefined,
      maxYear: searchParams.get("maxYear")
        ? Number(searchParams.get("maxYear"))
        : undefined,
      language: searchParams.get("language") || undefined,
      sort: parseSort(searchParams.get("sort")),
       page: searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1,
    };
  };

  //  ÚNICO lugar donde se hace fetch
  useEffect(() => {
    const params = getParamsFromUrl();

    // evitar fetch vacío
    if (!Object.values(params).some((v) => v !== undefined)) return;

    const load = async () => {
      setLoading(true);

      try {
        const { books } = await searchBooks(params);
        setBooks(books);
      } catch (err) {
        console.error("Error buscando libros:", err);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [searchParams]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Resultados de búsqueda</h1>

      {/* 🔍 búsqueda simple */}
      <SearchBar onSearch={fetchBooks} />

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
      <Pagination
        page={currentPage}
        onChange={(newPage) => {
          const params = getParamsFromUrl();
          fetchBooks({ ...params, page: newPage });
        }}
      />
    </div>

  );

};

export default BuscarPage;