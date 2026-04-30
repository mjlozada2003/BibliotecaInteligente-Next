import { get } from "http";

const FAVORITES_KEY = 'biblioteca_favoritos';

export const getFavorites= (): string[] => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
};

export const addFavorite = (workId: string):void => {
    const current= getFavorites();
    if (!current.includes(workId)) {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify([...current, workId]));
    }
};

export const removeFavorite = (workId: string): void => {
    const current = getFavorites();
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(current.filter(id => id !== workId)));
};

export const isFavorite = (workId : string): boolean => {
    return getFavorites().includes(workId);
};

export const toggleFavorite = (workId: string): boolean => {
    const exists = isFavorite(workId);
    if (exists) {
        removeFavorite(workId);
    } else {
        addFavorite(workId);
    }
    return !exists; 
};