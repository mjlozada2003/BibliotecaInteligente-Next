import React from 'react';
import { Book } from '../../types/Book';  // Importamos la interfaz Book desde el archivo types/book.d.ts
import styles from './BookCard.module.scss'; // Importamos los estilos para el componente

const BookCard: React.FC<{ book: Book }> = ({ book }) => {
  const { title, author_name, first_publish_year, cover_i } = book;

  return (
    <div className={styles.bookCard}>
      <img 
        src={`https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`} 
        alt={title} 
        className={styles.cover} 
      />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.author}>Autor: {author_name ? author_name.join(', ') : 'Desconocido'}</p>
      <p className={styles.year}>Año de publicación: {first_publish_year}</p>
      <div className={styles.buttons}>
        <button className={styles.btn}>Ver detalles</button>
        <button className={styles.btn}>Agregar a favoritos</button>
      </div>
    </div>
  );
};

export default BookCard;