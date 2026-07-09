import {
  Activity,
  LogIn,
  User,
  Calendar,
  Clock,
  Pencil,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useAdmin } from "../../../../context/AdminContext";

function MemberActivitySection() {

  const navigate = useNavigate();

  const {

    selectedMember,

  } = useAdmin();

  if (!selectedMember) {

    return null;

  }

  const activities =

    selectedMember.activity || [];

  const getIcon = (type) => {

    switch (type) {

      case "login":

        return <LogIn size={18} />;

      case "profile":

        return <User size={18} />;

      case "event":

        return <Calendar size={18} />;

      default:

        return <Activity size={18} />;

    }

  };

  return (

    <section className="member-profile-section">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="member-profile-section-header">

        <div>

          <h2>

            Recent Activity

          </h2>

          <p>

            Recent account activity and engagement within JVP Connect.

          </p>

        </div>

        <button

          className="section-edit-btn"

          onClick={() =>

            navigate(

              `/admin/members/${selectedMember._id}/edit`

            )

          }

        >

          <Pencil size={16} />

          Edit

        </button>

      </div>

      {/* ==========================================
          ACTIVITY LIST
      ========================================== */}

      {

        activities.length === 0 ? (

          <div className="member-activity-empty">

            <Activity size={40} />

            <h4>

              No Activity Available

            </h4>

            <p>

              This member has no recorded activity yet.

            </p>

          </div>

        ) : (

          <div className="member-activity-list">

            {

              activities.map((item, index) => (

                <div

                  key={item.id || index}

                  className="member-activity-item"

                >

                  <div className="member-activity-icon">

                    {

                      getIcon(item.type)

                    }

                  </div>

                  <div className="member-activity-content">

                    <h4>

                      {

                        item.title ||

                        item.activity

                      }

                    </h4>

                    <p>

                      {

                        item.description ||

                        "-"

                      }

                    </p>

                  </div>

                  <div className="member-activity-time">

                    <Clock size={15} />

                    <span>

                      {

                        item.when ||

                        item.date ||

                        "-"

                      }

                    </span>

                  </div>

                </div>

              ))

            }

          </div>

        )

      }

    </section>

  );

}

export default MemberActivitySection;