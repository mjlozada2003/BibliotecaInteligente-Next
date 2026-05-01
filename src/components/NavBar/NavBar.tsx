"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./NavBar.module.scss";
import { useTheme } from "@/providers/ThemeProvider";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { darkMode, toggleDarkMode } = useTheme();

  const navItems = [
    { href: "/", label: "Inicio" },
    { href: "/buscar", label: "Buscar" },
    { href: "/favoritos", label: "Favoritos" },
    { href: "/acerca", label: "Acerca" },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>📚 Biblioteca UCB</div>

      <div className={styles.hamburger} onClick={() => setOpen(!open)}>
        ☰
      </div>

      <div className={`${styles.links} ${open ? styles.show : ""}`}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={pathname === item.href ? styles.active : ""}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Botón de modo oscuro */}
      <button
        onClick={toggleDarkMode}
        className={styles.themeToggle}
        aria-label="Cambiar tema"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
    </nav>
  );
};

export default NavBar;