import {
  CheckCircle2,
  Circle,
  CalendarDays,
  MapPin,
 ShieldCheck,
  Clock3,
  CreditCard,
} from "lucide-react";

import { useDashboard } from "../../context/DashboardContext";

import "./ProfileSidebar.css";

function ProfileSidebar() {

  const {
    dashboard,
    loading,
    error,
  } = useDashboard();

  if (loading) {
    return (
      <aside className="profile-sidebar dashboard-card">
        <div className="empty-state">
          Loading profile summary...
        </div>
      </aside>
    );
  }

  if (error) {
    return (
      <aside className="profile-sidebar dashboard-card">
        <div className="empty-state">
          {error}
        </div>
      </aside>
    );
  }

  if (!dashboard?.member) {
    return (
      <aside className="profile-sidebar dashboard-card">
        <div className="empty-state">
          Profile unavailable.
        </div>
      </aside>
    );
  }

  const { member } = dashboard;

  const completion = member.profileCompleted || 0;

  const checklist = [

    {
      title: "Personal Information",
      complete: completion >= 20,
    },

    {
      title: "Education",
      complete: completion >= 40,
    },

    {
      title: "Employment",
      complete: completion >= 60,
    },

    {
      title: "Leadership",
      complete: completion >= 80,
    },

    {
      title: "Skills & Social Links",
      complete: completion >= 100,
    },

  ];

  return (

    <aside className="profile-sidebar dashboard-card">

      {/* ====================================== */}

      <div className="sidebar-section">

        <h3>

          Profile Completion

        </h3>

        <div className="sidebar-progress">

          <strong>

            {completion}%

          </strong>

          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{
                width: `${completion}%`,
              }}
            />

          </div>

        </div>

      </div>

      {/* ====================================== */}

      <div className="sidebar-section">

        <h3>

          Account Summary

        </h3>

        <div className="summary-list">

          <div className="summary-item">

            <ShieldCheck size={18} />

            <div>

              <small>Status</small>

              <strong>

                {member.membershipStatus}

              </strong>

            </div>

          </div>

          <div className="summary-item">

            <CreditCard size={18} />

            <div>

              <small>Membership No.</small>

              <strong>

                {member.membershipNumber}

              </strong>

            </div>

          </div>

          <div className="summary-item">

            <MapPin size={18} />

            <div>

              <small>County</small>

              <strong>

                {member.county}

              </strong>

            </div>

          </div>

          <div className="summary-item">

            <CalendarDays size={18} />

            <div>

              <small>Member Since</small>

              <strong>

                {member.memberSince
                  ? new Date(
                      member.memberSince
                    ).getFullYear()
                  : "-"}

              </strong>

            </div>

          </div>

          <div className="summary-item">

            <Clock3 size={18} />

            <div>

              <small>Last Login</small>

              <strong>

                {
                  dashboard.statistics?.lastLogin
                    ? new Date(
                        dashboard.statistics.lastLogin
                      ).toLocaleDateString()
                    : "First Login"
                }

              </strong>

            </div>

          </div>

        </div>

      </div>

      {/* ====================================== */}

      <div className="sidebar-section">

        <h3>

          Completion Checklist

        </h3>

        <div className="checklist">

          {

            checklist.map((item) => (

              <div
                key={item.title}
                className="check-item"
              >

                {

                  item.complete ? (

                    <CheckCircle2
                      size={18}
                      className="check-complete"
                    />

                  ) : (

                    <Circle
                      size={18}
                      className="check-pending"
                    />

                  )

                }

                <span>

                  {item.title}

                </span>

              </div>

            ))

          }

        </div>

      </div>

    </aside>

  );

}

export default ProfileSidebar;