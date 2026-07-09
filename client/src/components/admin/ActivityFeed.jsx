import {
  LogIn,
  UserPlus,
  CalendarDays,
  Bell,
  Briefcase,
  Award,
} from "lucide-react";

import { useAdmin } from "../../context/AdminContext";

import "./ActivityFeed.css";

function ActivityFeed() {

  const {

    recentActivity,

  } = useAdmin();

  const getIcon = (type) => {

    switch (type) {

      case "member":

        return <UserPlus size={18} />;

      case "event":

        return <CalendarDays size={18} />;

      case "notification":

        return <Bell size={18} />;

      case "program":

        return <Briefcase size={18} />;

      case "certificate":

        return <Award size={18} />;

      default:

        return <LogIn size={18} />;

    }

  };

  return (

    <section className="activity-feed">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="section-header">

        <div>

          <h2>

            Recent Activity

          </h2>

          <p>

            Latest actions across JVP Connect.

          </p>

        </div>

      </div>

      {/* ==========================================
          ACTIVITIES
      ========================================== */}

      {

        recentActivity.length === 0 ? (

          <div className="activity-empty">

            No recent activity available.

          </div>

        ) : (

          <div className="activity-list">

            {

              recentActivity.map((activity) => (

                <div

                  key={activity.id}

                  className="activity-item"

                >

                  <div className="activity-icon">

                    {

                      getIcon(activity.type)

                    }

                  </div>

                  <div className="activity-content">

                    <h4>

                      {activity.activity}

                    </h4>

                    <p>

                      {

                        activity.description ||

                        "System activity"

                      }

                    </p>

                  </div>

                  <span className="activity-time">

                    {

                      activity.when ||

                      activity.time

                    }

                  </span>

                </div>

              ))

            }

          </div>

        )

      }

    </section>

  );

}

export default ActivityFeed;