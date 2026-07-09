import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import "./MemberPagination.css";

function MemberPagination({

  currentPage = 1,

  totalPages = 1,

  totalRecords = 0,

  pageSize = 10,

  onPageChange = () => {},

  onPageSizeChange = () => {},

}) {

  const startRecord =
    totalRecords === 0
      ? 0
      : (currentPage - 1) * pageSize + 1;

  const endRecord = Math.min(

    currentPage * pageSize,

    totalRecords

  );

  return (

    <section className="member-pagination">

      {/* ==========================================
          RECORD COUNT
      ========================================== */}

      <div className="pagination-info">

        Showing

        <strong>

          {" "}
          {startRecord}-{endRecord}{" "}

        </strong>

        of

        <strong>

          {" "}
          {totalRecords}{" "}

        </strong>

        members

      </div>

      {/* ==========================================
          PAGE SIZE
      ========================================== */}

      <div className="pagination-size">

        <span>

          Rows per page

        </span>

        <select

          value={pageSize}

          onChange={(e) =>

            onPageSizeChange(

              Number(e.target.value)

            )

          }

        >

          <option value={10}>10</option>

          <option value={25}>25</option>

          <option value={50}>50</option>

          <option value={100}>100</option>

        </select>

      </div>

      {/* ==========================================
          CONTROLS
      ========================================== */}

      <div className="pagination-controls">

        <button

          disabled={currentPage === 1}

          onClick={() =>

            onPageChange(

              currentPage - 1

            )

          }

        >

          <ChevronLeft size={18} />

        </button>

        <span className="page-number">

          Page

          <strong>

            {" "}
            {currentPage}{" "}

          </strong>

          of

          <strong>

            {" "}
            {totalPages}{" "}

          </strong>

        </span>

        <button

          disabled={

            currentPage === totalPages ||

            totalPages === 0

          }

          onClick={() =>

            onPageChange(

              currentPage + 1

            )

          }

        >

          <ChevronRight size={18} />

        </button>

      </div>

    </section>

  );

}

export default MemberPagination;