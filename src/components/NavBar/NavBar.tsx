"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.scss";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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
            onClick={() => setOpen(false)} // cierra menú al hacer clic
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;