import MemberStats from "../../components/admin/members/MemberStats";
import MembersToolbar from "../../components/admin/members/MembersToolbar";
import MembersTable from "../../components/admin/members/MembersTable";
import MemberPagination from "../../components/admin/members/MemberPagination";

import "./Members.css";

function Members() {

  return (

    <section className="members-page">

      {/* ==========================================
          PAGE HEADER
      ========================================== */}

      <div className="members-header">

        <div>

          <h1>

            Members Management

          </h1>

          <p>

            Manage registrations, memberships,
            leadership, activation, payments
            and member records across all six
            coastal counties.

          </p>

        </div>

      </div>

      {/* ==========================================
          MEMBER STATISTICS
      ========================================== */}

      <MemberStats />

      {/* ==========================================
          TOOLBAR
      ========================================== */}

      <MembersToolbar />

      {/* ==========================================
          MEMBERS TABLE
      ========================================== */}

      <MembersTable />

      {/* ==========================================
          PAGINATION
      ========================================== */}

      <MemberPagination />

    </section>

  );

}

export default Members;