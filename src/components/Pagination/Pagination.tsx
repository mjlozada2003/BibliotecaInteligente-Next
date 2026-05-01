import styles from "./Pagination.module.scss";

interface Props {
  page: number;
  onChange: (page: number) => void;
}

const Pagination = ({ page, onChange }: Props) => {
  return (
    <div className={styles.pagination}>
      <button
        aria-label="Página anterior"
        className={`${styles.button} ${page <= 1 ? styles.disabled : ""}`}
        onClick={() => page > 1 && onChange(page - 1)}
        disabled={page <= 1}
      >
        ← Anterior
      </button>

      <span className={styles.pageInfo}>
        Página {page}
      </span>

      <button
        aria-label="Página siguiente"
        className={styles.button}
        onClick={() => onChange(page + 1)}
      >
        Siguiente →
      </button>
    </div>
  );
};

export default Pagination;