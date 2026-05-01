import styles from './page.module.scss';

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Acerca de</h1>
      <p className={styles.subtitle}>Biblioteca Digital UCB - Proyecto Académico</p>

      <div className={styles.card}>
        <h2>Universidad Católica Boliviana "San Pablo"</h2>
        <p>Departamento de Ingeniería de Sistemas</p>
        <h3>Docente</h3>
        <p>Ing. Mauricio Alejandro Quezada Bustillo</p>
        <h3>Sobre el Proyecto</h3>
        <p>
          Esta aplicación web es un proyecto académico que demuestra el uso de tecnologías modernas
          para crear una biblioteca digital interactiva. Utiliza la API pública de Open Library
          para proporcionar acceso a millones de libros.
        </p>
      </div>

      <div className={styles.card}>
        <h2>Tecnologías Utilizadas</h2>
        <div className={styles.table}>
          <div className={styles.column}>
            <strong>Frontend</strong>
            <ul>
              <li>React 18</li>
              <li>React Router v7</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Lucide Icons</li>
            </ul>
          </div>
          <div className={styles.column}>
            <strong>Características</strong>
            <ul>
              <li>Búsqueda avanzada</li>
              <li>Filtros múltiples</li>
              <li>Sistema de favoritos</li>
              <li>Persistencia local</li>
              <li>Diseño responsivo</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <h2>Fuente de Datos</h2>
        <p>
          Los datos de libros provienen de{" "}
          <a href="https://openlibrary.org" target="_blank" rel="noopener noreferrer">
            Open Library
          </a>
          , un proyecto de Internet Archive que proporciona acceso gratuito a millones de libros
          digitalizados.
        </p>
      </div>

      <div className={styles.card}>
        <h2>Funcionalidades</h2>
        <ul className={styles.features}>
          <li>Visualización de libros populares en la página principal</li>
          <li>Búsqueda avanzada por título, autor y tema</li>
          <li>Filtros por año de publicación, idioma y ordenamiento</li>
          <li>Detalles completos de cada libro con enlace a Open Library</li>
          <li>Sistema de favoritos con persistencia en localStorage</li>
        </ul>
      </div>

      <footer className={styles.footer}>
        Desarrollado como proyecto académico para el curso de Desarrollo Web<br />
        © 2026 Universidad Católica Boliviana "San Pablo"
      </footer>
    </div>
  );
}