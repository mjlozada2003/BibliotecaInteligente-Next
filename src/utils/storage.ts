import { get } from "http";
import {Book} from "@/types";

const FAVORITES_KEY = 'biblioteca_favoritos';

export const getFavorites = (): Book[] => {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const addFavorite = (book: Book): void => {
  const current = getFavorites();
  if (!current.some(b => b.workId === book.workId)) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([...current, book]));
  }
};

export const removeFavorite = (workId: string): void => {
  const current = getFavorites();
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(current.filter(b => b.workId !== workId)));
};

export const isFavorite = (workId: string): boolean => {
  return getFavorites().some(b => b.workId === workId);
};

export const toggleFavorite = (book: Book): boolean => {
  const exists = isFavorite(book.workId);
  if (exists) removeFavorite(book.workId);
  else addFavorite(book);
  return !exists;
};