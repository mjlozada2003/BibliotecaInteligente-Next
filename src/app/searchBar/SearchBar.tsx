"use client";

import { useState } from "react";
import styles from "./SearchBar.module.scss";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    onSearch(query);
  };

  return (
    <form className={styles.searchBox} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Buscar libros..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className={styles.button} type="submit">
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;