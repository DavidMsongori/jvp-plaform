import MemberActions from "./MemberActions";

import "./Members.css";

function MembersTable({

  members = [],

  loading,

  pagination = {},

  filters,

  setFilters,

}) {

  /* ==========================================
     PAGINATION
  ========================================== */

  const goToPage = (page) => {

    if (

      page < 1 ||

      page > (pagination.totalPages || 1)

    ) {

      return;

    }

    setFilters((previous) => ({

      ...previous,

      page,

    }));

  };

  /* ==========================================
     LOADING
  ========================================== */

  if (loading) {

    return (

      <div className="table-loading">

        Loading members...

      </div>

    );

  }

  /* ==========================================
     EMPTY STATE
  ========================================== */

  if (!members.length) {

    return (

      <div className="table-empty">

        <h3>No Members Found</h3>

        <p>

          Try changing your search or filters.

        </p>

      </div>

    );

  }

  return (

    <div className="table-container">

      <table className="members-table">

        <thead>

          <tr>

            <th>Member</th>

            <th>Membership No.</th>

            <th>County</th>

            <th>Phone</th>

            <th>Category</th>

            <th>Status</th>

            <th>Joined</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {members.map((member) => (

            <tr key={member._id}>

              {/* ======================================
                  MEMBER
              ====================================== */}

              <td>

                <div className="member-cell">

                  <img

                    src={
                      member.profilePhoto ||

                      "/images/avatar.png"
                    }

                    alt={`${member.firstName} ${member.lastName}`}

                    className="member-avatar"

                  />

                  <div>

                    <strong>

                      {member.firstName}{" "}

                      {member.middleName
                        ? `${member.middleName} `
                        : ""}

                      {member.lastName}

                    </strong>

                    <small>

                      {member.user?.email ||

                        "No email"}

                    </small>

                  </div>

                </div>

              </td>

              {/* ======================================
                  MEMBERSHIP NUMBER
              ====================================== */}

              <td>

                {member.membershipNumber || "-"}

              </td>

              {/* ======================================
                  COUNTY
              ====================================== */}

              <td>

                {member.county || "-"}

              </td>

              {/* ======================================
                  PHONE
              ====================================== */}

              <td>

                {member.phone || "-"}

              </td>

              {/* ======================================
                  MEMBERSHIP CATEGORY
              ====================================== */}

              <td>

                <span

                  className={`badge membership ${(

                    member.membershipCategory ||

                    ""

                  )

                    .toLowerCase()

                    .replace(/\s+/g, "-")}`}

                >

                  {member.membershipCategory ||

                    "-"}

                </span>

              </td>

              {/* ======================================
                  MEMBERSHIP STATUS
              ====================================== */}

              <td>

                <span

                  className={`badge status ${(

                    member.membershipStatus ||

                    ""

                  )

                    .toLowerCase()

                    .replace(/\s+/g, "-")}`}

                >

                  {member.membershipStatus ||

                    "-"}

                </span>

              </td>

              {/* ======================================
                  JOIN DATE
              ====================================== */}

              <td>

                {member.createdAt

                  ? new Date(

                      member.createdAt

                    ).toLocaleDateString()

                  : "-"}

              </td>

              {/* ======================================
                  ACTIONS
              ====================================== */}

              <td>

                <MemberActions

                  member={member}

                  onView={(member) => {

                    console.log(

                      "View",

                      member

                    );

                  }}

                  onEdit={(member) => {

                    console.log(

                      "Edit",

                      member

                    );

                  }}

                  onActivate={(member) => {

                    console.log(

                      "Activate",

                      member

                    );

                  }}

                  onDeactivate={(member) => {

                    console.log(

                      "Deactivate",

                      member

                    );

                  }}

                  onDelete={(member) => {

                    console.log(

                      "Delete",

                      member

                    );

                  }}

                />

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      {/* ==========================================
          PAGINATION
      ========================================== */}

      <div className="table-pagination">

        <button

          disabled={

            !pagination.hasPreviousPage

          }

          onClick={() =>

            goToPage(

              pagination.page - 1

            )

          }

        >

          Previous

        </button>

        <span>

          Page {pagination.page || 1}

          {" "}of{" "}

          {pagination.totalPages || 1}

        </span>

        <button

          disabled={

            !pagination.hasNextPage

          }

          onClick={() =>

            goToPage(

              pagination.page + 1

            )

          }

        >

          Next

        </button>

      </div>

    </div>

  );

}

export default MembersTable;