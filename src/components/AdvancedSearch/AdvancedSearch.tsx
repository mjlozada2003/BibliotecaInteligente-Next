"use client";

import { useState } from "react";
import styles from "./AdvancedSearch.module.scss";

const AdvancedSearch = ({ onSearch }: any) => {
    const [showFilters, setShowFilters] = useState(false);

    const [form, setForm] = useState({
        q: "",
        title: "",
        author: "",
        subject: "",
        minYear: "",
        maxYear: "",
        language: "",
        sort: "",
    });

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSearch = () => {
        const params = {
            q: form.q,
            title: form.title,
            author: form.author,
            subject: form.subject,
            minYear: form.minYear ? Number(form.minYear) : undefined,
            maxYear: form.maxYear ? Number(form.maxYear) : undefined,
            language: form.language || undefined,
            sort: form.sort || undefined,
        };

        onSearch(params); // 🔥 SOLO ESTO
    };

    const handleClear = () => {
        setForm({
            q: "",
            title: "",
            author: "",
            subject: "",
            minYear: "",
            maxYear: "",
            language: "",
            sort: "",
        });
    };

    return (
        <div className={styles.container}>
            <h2>Búsqueda Avanzada</h2>

            {/* 🔍 CAMPOS PRINCIPALES */}
            <div className={styles.grid}>
                <div>
                    <label>Búsqueda general</label>
                    <input name="q" value={form.q} onChange={handleChange} />
                </div>

                <div>
                    <label>Título</label>
                    <input name="title" value={form.title} onChange={handleChange} />
                </div>

                <div>
                    <label>Autor</label>
                    <input name="author" value={form.author} onChange={handleChange} />
                </div>

                <div>
                    <label>Tema</label>
                    <input name="subject" value={form.subject} onChange={handleChange} />
                </div>
            </div>

            {/* 🔽 TOGGLE */}
            <button
                className={styles.toggle}
                onClick={() => setShowFilters(!showFilters)}
            >
                {showFilters ? "Ocultar filtros" : "Mostrar filtros"}
            </button>

            {/* 🎛️ FILTROS */}
            {showFilters && (
                <div className={styles.filters}>
                    <input
                        placeholder="Año mínimo"
                        name="minYear"
                        value={form.minYear}
                        onChange={handleChange}
                    />

                    <input
                        placeholder="Año máximo"
                        name="maxYear"
                        value={form.maxYear}
                        onChange={handleChange}
                    />

                    <select name="language" onChange={handleChange}>
                        <option value="">Todos</option>
                        <option value="eng">Inglés</option>
                        <option value="spa">Español</option>
                    </select>

                    <select name="sort" onChange={handleChange}>
                        <option value="">Sin ordenar</option>
                        <option value="year_asc">Año ↑</option>
                        <option value="year_desc">Año ↓</option>
                        <option value="editions_desc">Ediciones ↓</option>
                    </select>
                </div>
            )}

            {/* 🔘 BOTONES */}
            <div className={styles.actions}>
                <button onClick={handleSearch}>Buscar</button>
                <button onClick={handleClear}>Limpiar</button>
            </div>
        </div>
    );
};

export default AdvancedSearch;