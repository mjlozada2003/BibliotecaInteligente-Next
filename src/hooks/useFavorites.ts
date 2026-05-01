import {useState, useEffect} from 'react';
import {getFavorites, addFavorite, removeFavorite, isFavorite, toggleFavorite} from '../utils/storage';
import {Book} from '@/types';

export const useFavorites = () => {
  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([]);

  useEffect(() => {
    setFavoriteBooks(getFavorites());
  }, []);

  const add = (book: Book) => {
    addFavorite(book);
    setFavoriteBooks(getFavorites());
  };

  const remove = (workId: string) => {
    removeFavorite(workId);
    setFavoriteBooks(getFavorites());
  };

  const toggle = (book: Book) => {
    const result = toggleFavorite(book);
    setFavoriteBooks(getFavorites());
    return result;
  };

  const isFav = (workId: string) => favoriteBooks.some(b => b.workId === workId);

  return { favoriteBooks, add, remove, toggle, isFav };
};