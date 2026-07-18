import "./Event.css";

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
    page,
    totalPages,
    total,
    limit,
  } = pagination;

  const pages = [];

  const start = Math.max(1, page - 2);
  const end = Math.min(
    totalPages,
    page + 2
  );

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  const firstResult =
    (page - 1) * limit + 1;

  const lastResult = Math.min(
    page * limit,
    total
  );

  return (
    <section className="event-pagination-wrapper">

      <div className="pagination-info">
        Showing {firstResult} - {lastResult}
        {" "}of {total} events
      </div>

      <div className="event-pagination">

        <button
          disabled={page === 1}
          onClick={() =>
            onPageChange(1)
          }
        >
          First
        </button>

        <button
          disabled={page === 1}
          onClick={() =>
            onPageChange(page - 1)
          }
        >
          Previous
        </button>

        {start > 1 && (
          <>
            <button
              onClick={() =>
                onPageChange(1)
              }
            >
              1
            </button>

            {start > 2 && (
              <span className="pagination-dots">
                ...
              </span>
            )}
          </>
        )}

        {pages.map((number) => (
          <button
            key={number}
            className={
              page === number
                ? "active"
                : ""
            }
            onClick={() =>
              onPageChange(number)
            }
          >
            {number}
          </button>
        ))}

        {end < totalPages && (
          <>
            {end < totalPages - 1 && (
              <span className="pagination-dots">
                ...
              </span>
            )}

            <button
              onClick={() =>
                onPageChange(totalPages)
              }
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          disabled={page === totalPages}
          onClick={() =>
            onPageChange(page + 1)
          }
        >
          Next
        </button>

        <button
          disabled={page === totalPages}
          onClick={() =>
            onPageChange(totalPages)
          }
        >
          Last
        </button>

      </div>

    </section>
  );
};

export default Pagination;