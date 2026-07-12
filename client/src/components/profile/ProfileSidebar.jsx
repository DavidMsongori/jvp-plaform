import {
  CheckCircle2,
  Circle,
  CalendarDays,
  MapPin,
  ShieldCheck,
  Clock3,
  CreditCard,
} from "lucide-react";

import {
  useDashboard,
} from "../../context/DashboardContext";

import "./ProfileSidebar.css";

function ProfileSidebar() {

  const {

    profile,

    statistics,

    loading,

    error,

  } = useDashboard();

  /* ==========================================
     LOADING
  ========================================== */

  if (loading) {

    return (

      <aside className="profile-sidebar dashboard-card">

        <div className="empty-state">

          Loading profile summary...

        </div>

      </aside>

    );

  }

  /* ==========================================
     ERROR
  ========================================== */

  if (error) {

    return (

      <aside className="profile-sidebar dashboard-card">

        <div className="empty-state">

          {error}

        </div>

      </aside>

    );

  }

  /* ==========================================
     NO PROFILE
  ========================================== */

  if (!profile) {

    return (

      <aside className="profile-sidebar dashboard-card">

        <div className="empty-state">

          Profile unavailable.

        </div>

      </aside>

    );

  }

  /* ==========================================
     PROFILE COMPLETION
     (Temporary until backend computes it)
  ========================================== */

  const completion = 100;

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

      {/* ======================================
          PROFILE COMPLETION
      ====================================== */}

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

      {/* ======================================
          ACCOUNT SUMMARY
      ====================================== */}

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

                {profile.membershipStatus || "-"}

              </strong>

            </div>

          </div>

          <div className="summary-item">

            <CreditCard size={18} />

            <div>

              <small>Membership No.</small>

              <strong>

                {profile.memberNumber || "-"}

              </strong>

            </div>

          </div>

          <div className="summary-item">

            <MapPin size={18} />

            <div>

              <small>County</small>

              <strong>

                {profile.county || "-"}

              </strong>

            </div>

          </div>

          <div className="summary-item">

            <CalendarDays size={18} />

            <div>

              <small>Member Since</small>

              <strong>

                {

                  profile.joinedAt

                    ? new Date(

                        profile.joinedAt

                      ).getFullYear()

                    : "-"

                }

              </strong>

            </div>

          </div>

          <div className="summary-item">

            <Clock3 size={18} />

            <div>

              <small>Payments</small>

              <strong>

                {statistics.totalPayments ?? 0}

              </strong>

            </div>

          </div>

        </div>

      </div>

      {/* ======================================
          CHECKLIST
      ====================================== */}

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