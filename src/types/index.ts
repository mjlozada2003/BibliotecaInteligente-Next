export interface Book{
    workID: string;
    title: string;
    authors: string[];
    firstPublishYear?: number;
    editionCount?: number;
    coverID?: number; // ID para obtener la portada del libro
    description?: string;
    subjects?: string[]; // Temas relacionados con el libro
    openLibraryUrl?: string; //enlace a la página del libro en Open Library
}

export interface SearchParams {
    q?: string; // bisqueda general (autor + título + tema)
    title?: string; // búsqueda por título
    author?: string; 
    subject?: string; 
    minYear?: number; // año mínimo de publicación
    maxYear?: number; // año máximo de publicación
    language?: string; 
    sort?:'year_asc' | 'year_desc' | 'editions_desc'; // ordenamiento de resultados
    page?: number; // número de página para paginación
    limit?: number; // número de resultados por página
}

export interface SearchResponse{
    docs: any[]; // resultados de la búsqueda
    total: number; // total de resultados encontrados
}