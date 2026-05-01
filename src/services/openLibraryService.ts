// src/services/openLibraryService.ts
import { Book, SearchParams } from '@/types';

const OPEN_LIBRARY_SEARCH = 'https://openlibrary.org/search.json';
const OPEN_LIBRARY_WORKS = 'https://openlibrary.org/works';

/** Obtiene URL de portada (con placeholder por defecto) */
export const getCoverUrl = (coverId?: number, size: 'S' | 'M' | 'L' = 'M'): string => {
  if (!coverId) return '/placeholder-book.svg';
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
};

/** Busca libros usando la API de Open Library */
export const searchBooks = async (params: SearchParams): Promise<{ books: Book[]; total: number }> => {
  // Construir query principal
  let query = '';
  if (params.q) {
    query = params.q;
  } else {
    const parts: string[] = [];
    if (params.title) parts.push(`title:${encodeURIComponent(params.title)}`);
    if (params.author) parts.push(`author:${encodeURIComponent(params.author)}`);
    if (params.subject) parts.push(`subject:${encodeURIComponent(params.subject)}`);
    query = parts.join(' AND ');
    if (!query) query = '*:*'; // fallback: devuelve todos los libros
  }

  // Filtros adicionales (año, idioma)
  const filters: string[] = [];

  if (params.minYear !== undefined) {
    const max = params.maxYear !== undefined ? params.maxYear : '*';
    filters.push(`first_publish_year:[${params.minYear} TO ${max}]`);
  } else if (params.maxYear !== undefined) {
    filters.push(`first_publish_year:[* TO ${params.maxYear}]`);
  }

  if (params.language) {
    filters.push(`language:${params.language}`);
  }

  if (filters.length) {
    query = `(${query}) AND ${filters.join(' AND ')}`;
  }

  // Ordenamiento
  let sortParam = '';
  switch (params.sort) {
    case 'year_asc': sortParam = 'first_publish_year asc'; break;
    case 'year_desc': sortParam = 'first_publish_year desc'; break;
    case 'editions_desc': sortParam = 'edition_count desc'; break;
    default: sortParam = '';
  }

  // Paginación
  const page = params.page || 1;
  const limit = params.limit || 20;
  const offset = (page - 1) * limit;

  // Construir URL
  const url = new URL(OPEN_LIBRARY_SEARCH);
  url.searchParams.set('q', query);
  if (sortParam) url.searchParams.set('sort', sortParam);
  url.searchParams.set('offset', offset.toString());
  url.searchParams.set('limit', limit.toString());
  url.searchParams.set('fields', 'key,title,author_name,first_publish_year,edition_count,cover_i,language');

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Error en búsqueda: ${res.statusText}`);

  const data = await res.json();

  const books: Book[] = (data.docs || []).map((doc: any) => ({
    workId: doc.key?.replace('/works/', '') || '',
    title: doc.title || 'Sin título',
    authors: doc.author_name || ['Autor desconocido'],
    firstPublishYear: doc.first_publish_year,
    editionCount: doc.edition_count,
    coverId: doc.cover_i,
    openLibraryUrl: doc.key ? `https://openlibrary.org${doc.key}` : undefined,
  }));

  return { books, total: data.num_found || 0 };
};

/** Obtiene detalles completos de un libro (usando /works/{workId}.json) */
export const getBookDetails = async (workId: string): Promise<Book | null> => {
  const url = `${OPEN_LIBRARY_WORKS}/${workId}.json`;
  const res = await fetch(url);
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`Error obteniendo detalle: ${res.statusText}`);
  }

  const data = await res.json();

  // Descripción (puede ser string u objeto)
  let description = '';
  if (data.description) {
    description = typeof data.description === 'string'
      ? data.description
      : data.description.value || '';
  }

  // Temas / subjects
  const subjects: string[] = Array.isArray(data.subjects) ? data.subjects : [];

  // Autores: puede venir como array de objetos { author: { name } } o directamente nombres
  let authors: string[] = [];
  if (Array.isArray(data.authors)) {
    authors = data.authors.map((a: any) => {
      if (a.author?.name) return a.author.name;
      if (a.name) return a.name;
      return 'Autor desconocido';
    });
  }

  // Año de primera publicación
  let firstPublishYear: number | undefined;
  if (data.first_publish_date) {
    const yearMatch = data.first_publish_date.match(/\d{4}/);
    if (yearMatch) firstPublishYear = parseInt(yearMatch[0]);
  }

  // Número de ediciones
  const editionCount = data.edition_count;

  return {
    workId,
    title: data.title || 'Sin título',
    authors,
    firstPublishYear,
    editionCount,
    description,
    subjects,
    openLibraryUrl: `https://openlibrary.org/works/${workId}`,
    // coverId no viene en este endpoint; se debería obtener de la búsqueda previa
  };
};