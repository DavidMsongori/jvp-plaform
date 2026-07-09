import {
  User,
  MapPin,
  ChevronRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useAdmin } from "../../context/AdminContext";

import "./RecentMembers.css";

function RecentMembers() {

  const navigate = useNavigate();

  const {

    recentMembers,

  } = useAdmin();

  return (

    <section className="recent-members">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="section-header">

        <div>

          <h2>

            Recent Members

          </h2>

          <p>

            Latest registrations in JVP Connect.

          </p>

        </div>

        <button

          className="view-all-btn"

          onClick={() =>

            navigate("/admin/members")

          }

        >

          View All

        </button>

      </div>

      {/* ==========================================
          MEMBERS
      ========================================== */}

      {

        recentMembers.length === 0 ? (

          <div className="empty-members">

            No recent registrations.

          </div>

        ) : (

          <div className="members-list">

            {

              recentMembers.map((member) => (

                <div

                  key={member.id || member._id}

                  className="member-row"

                >

                  <div className="member-avatar">

                    {

                      member.profilePhoto ? (

                        <img

                          src={member.profilePhoto}

                          alt={member.firstName}

                        />

                      ) : (

                        <User size={22} />

                      )

                    }

                  </div>

                  <div className="member-info">

                    <h4>

                      {

                        [

                          member.firstName,

                          member.middleName,

                          member.lastName,

                        ]

                          .filter(Boolean)

                          .join(" ")

                      }

                    </h4>

                    <span>

                      {

                        member.membershipNumber

                      }

                    </span>

                  </div>

                  <div className="member-county">

                    <MapPin size={15} />

                    <span>

                      {

                        member.county ||

                        "-"

                      }

                    </span>

                  </div>

                  <button

                    className="member-view"

                    onClick={() =>

                      navigate(

                        `/admin/members/${

                          member._id ||

                          member.id

                        }`

                      )

                    }

                  >

                    <ChevronRight

                      size={18}

                    />

                  </button>

                </div>

              ))

            }

          </div>

        )

      }

    </section>

  );

}

export default RecentMembers;