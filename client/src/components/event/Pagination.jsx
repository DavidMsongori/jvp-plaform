import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";

const Pagination = ({
  pagination,
  onPageChange,
}) => {
  if (
    !pagination ||
    pagination.totalPages <= 1
  ) {
    return null;
  }

  const {
    page = 1,
    totalPages = 1,
    total = 0,
    limit = 9,
    hasPrevPage = false,
    hasNextPage = false,
  } = pagination;

  const startItem =
    total === 0
      ? 0
      : (page - 1) * limit + 1;

  const endItem = Math.min(
    page * limit,
    total
  );

  /* ==========================================
     PAGE NUMBERS
  ========================================== */

  const pages = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    if (page > 3) {
      pages.push("...");
    }

    const start = Math.max(2, page - 1);
    const end = Math.min(
      totalPages - 1,
      page + 1
    );

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);
  }

  return (
    <section className="events-pagination">

      <div className="events-pagination__info">
        Showing{" "}
        <strong>{startItem}</strong>
        {" - "}
        <strong>{endItem}</strong>
        {" of "}
        <strong>{total}</strong> events
      </div>

      <nav
        className="events-pagination__controls"
        aria-label="Pagination"
      >
        <button
          type="button"
          className="events-pagination__button"
          disabled={!hasPrevPage}
          onClick={() =>
            onPageChange(page - 1)
          }
        >
          <ChevronLeft size={18} />
          Previous
        </button>

        {pages.map((item, index) =>
          item === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="events-pagination__ellipsis"
            >
              <MoreHorizontal size={18} />
            </span>
          ) : (
            <button
              key={item}
              type="button"
              className={`events-pagination__page ${
                page === item
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                onPageChange(item)
              }
            >
              {item}
            </button>
          )
        )}

        <button
          type="button"
          className="events-pagination__button"
          disabled={!hasNextPage}
          onClick={() =>
            onPageChange(page + 1)
          }
        >
          Next
          <ChevronRight size={18} />
        </button>
      </nav>

    </section>
  );
};

export default Pagination;