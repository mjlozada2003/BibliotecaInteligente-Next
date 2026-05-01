interface Props {
  page: number;
  onChange: (page: number) => void;
}

const Pagination = ({ page, onChange }: Props) => {
  return (
    <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
      <button
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
      >
        ← Anterior
      </button>

      <span>Página {page}</span>

      <button onClick={() => onChange(page + 1)}>
        Siguiente →
      </button>
    </div>
  );
};

export default Pagination;