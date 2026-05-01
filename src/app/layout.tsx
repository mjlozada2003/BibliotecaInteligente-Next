// src/app/layout.tsx
import type { Metadata } from "next";
import "../styles/main.scss";
import Navbar from "@/components/NavBar/NavBar";   // Ajusta la ruta exacta de tu Navbar
import ThemeProvider from "@/providers/ThemeProvider";

export const metadata: Metadata = {
  title: "Biblioteca Inteligente",
  description: "Explora libros digitales",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Navbar />
          <main className="main-content">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}