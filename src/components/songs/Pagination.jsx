/**
 * Generic pagination component
 */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ← Previous
      </button>

      <div className="pagination-numbers">
        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          // Show only pages near the current page
          if (
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - 2 && page <= currentPage + 2)
          ) {
            return (
              <button
                key={page}
                className={`pagination-number ${
                  page === currentPage ? "active" : ""
                }`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            );
          } else if (
            page === currentPage - 3 ||
            page === currentPage + 3
          ) {
            return (
              <span key={page} className="pagination-dots">
                ...
              </span>
            );
          }
          return null;
        })}
      </div>

      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
