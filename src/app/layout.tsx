import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/main.scss";

import Navbar from "./navBar/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Biblioteca UCB",
  description: "Explora libros digitales",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Navbar /> {/* 👈 solo agregas esto */}
        {children}
      </body>
    </html>
  );
}