import {useState, useEffect} from 'react';
import {getFavorites, addFavorite, removeFavorite, isFavorite, toggleFavorite} from '../utils/storage';

export const useFavorites = () => {
    const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
    useEffect(() => {
        setFavoriteIds(getFavorites());
    }, []);

    const add = (workId: string) => {
        addFavorite(workId);
        setFavoriteIds(getFavorites());
    };

    const remove = (workId: string) => {
        removeFavorite(workId);
        setFavoriteIds(getFavorites());
    };

    const toggle = (workId: string) => {
        const result = toggleFavorite(workId);
        setFavoriteIds(getFavorites());
        return result;
    };

    const isFav = (workId: string)=> favoriteIds.includes(workId);

    return {favoriteIds, add, remove, toggle, isFav};
 };