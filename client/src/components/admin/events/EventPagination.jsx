import "./Event.css";

const EventPagination = ({
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

  const start = Math.max(
    1,
    page - 2
  );

  const end = Math.min(
    totalPages,
    page + 2
  );

  const pages = [];

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  const firstItem =
    (page - 1) * limit + 1;

  const lastItem = Math.min(
    page * limit,
    total
  );

  return (
    <section className="admin-pagination">

      <div className="pagination-summary">
        Showing {firstItem} - {lastItem} of{" "}
        {total} events
      </div>

      <div className="pagination-controls">

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
              <span>...</span>
            )}
          </>
        )}

        {pages.map((number) => (
          <button
            key={number}
            className={
              number === page
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
            {end <
              totalPages - 1 && (
              <span>...</span>
            )}

            <button
              onClick={() =>
                onPageChange(
                  totalPages
                )
              }
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          disabled={
            page === totalPages
          }
          onClick={() =>
            onPageChange(page + 1)
          }
        >
          Next
        </button>

        <button
          disabled={
            page === totalPages
          }
          onClick={() =>
            onPageChange(
              totalPages
            )
          }
        >
          Last
        </button>

      </div>

    </section>
  );
};

export default EventPagination;