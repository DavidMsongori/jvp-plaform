import LoadingSpinner from "./LoadingSpinner";
import EmptyState from "./EmptyState";

import "./DataTable.css";

const DataTable = ({
  columns = [],
  data = [],
  loading = false,
  emptyTitle = "No Records",
  emptyMessage = "No data available.",
}) => {
  if (loading) {
    return (
      <LoadingSpinner text="Loading data..." />
    );
  }

  if (!data.length) {
    return (
      <EmptyState
        title={emptyTitle}
        message={emptyMessage}
      />
    );
  }

  return (
    <div className="datatable">

      <div className="table-responsive">

        <table className="table table-hover align-middle mb-0">

          <thead>

            <tr>

              {columns.map((column) => (
                <th
                  key={column.key}
                  style={column.width ? { width: column.width } : {}}
                >
                  {column.title}
                </th>
              ))}

            </tr>

          </thead>

          <tbody>

            {data.map((row) => (

              <tr key={row._id || row.id}>

                {columns.map((column) => (

                  <td key={column.key}>

                    {column.render
                      ? column.render(row)
                      : row[column.key]}

                  </td>

                ))}

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default DataTable;