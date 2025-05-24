import styles from "./Pagination.module.css";
function Pagination({ page, setPage, totalPages }) {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        className={styles.buttonAction}
        disabled={page === 1}
      >
        قبلی
      </button>

      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => setPage(num)}
          className={page === num ? styles.selected : styles.notSelected}
        >
          {num}
        </button>
      ))}

      <button
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        className={styles.buttonAction}
        disabled={page === totalPages}
      >
        بعدی
      </button>
    </div>
  );
}

export default Pagination;
