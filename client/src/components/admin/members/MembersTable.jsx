import { useAdmin } from "../../../context/AdminContext";

import MemberRow from "./MemberRow";

import "./MembersTable.css";

function MembersTable() {

  const {

    loading,

    members = [],

  } = useAdmin();

  if (loading) {

    return (

      <div className="members-table-card">

        <div className="members-loading">

          Loading members...

        </div>

      </div>

    );

  }

  return (

    <section className="members-table-card">

      <div className="members-table-wrapper">

        <table className="members-table">

          <thead>

            <tr>

              <th>Member</th>

              <th>Membership No.</th>

              <th>County</th>

              <th>Phone</th>

              <th>Role</th>

              <th>Status</th>

              <th>Payment</th>

              <th>Joined</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {

              members.length === 0 ? (

                <tr>

                  <td

                    colSpan="9"

                    className="empty-table"

                  >

                    No members found.

                  </td>

                </tr>

              ) : (

                members.map((member) => (

                  <MemberRow

                    key={member._id}

                    member={member}

                  />

                ))

              )

            }

          </tbody>

        </table>

      </div>

    </section>

  );

}

export default MembersTable;