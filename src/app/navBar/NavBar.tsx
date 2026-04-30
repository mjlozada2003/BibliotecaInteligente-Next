"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./NavBar.module.scss";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname(); // 🔥 clave

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>📚 Biblioteca UCB</div>

      <div
        className={styles.hamburger}
        onClick={() => setOpen(!open)}
      >
        ☰
      </div>

      <div className={`${styles.links} ${open ? styles.show : ""}`}>
        
        <a className={pathname === "/" ? styles.active : ""}>Inicio</a>
        <a className={pathname === "/buscar" ? styles.active : ""}>Buscar</a>
        <a className={pathname === "/favoritos" ? styles.active : ""}>Favoritos</a>
        <a className={pathname === "/acerca" ? styles.active : ""}>Acerca</a>

      </div>
    </nav>
  );
};

export default Navbar;