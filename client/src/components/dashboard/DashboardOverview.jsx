import MemberCard from "./MemberCard";
import DashboardStats from "./DashboardStats";
import QuickActions from "./QuickActions";
import UpcomingEvents from "./UpcomingEvents";
import NotificationPanel from "./NotificationPanel";
import RecentNews from "./RecentNews";

import { useAuth } from "../../context/AuthContext";

import "./DashboardOverview.css";

function DashboardOverview() {

  const { member } = useAuth();

  const completion =
    member?.profileCompleted || 0;

  return (

    <div className="dashboard-overview">

      {/* ==========================================
          WELCOME BANNER
      ========================================== */}

      <section className="dashboard-welcome">

        <div>

          <h1>

            Welcome back,
            {" "}
            {member?.firstName || "Member"} 👋

          </h1>

          <p>

            Manage your membership,
            events, programs and opportunities
            from one place.

          </p>

        </div>

        <div className="profile-progress">

          <span>

            Profile Completion

          </span>

          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{
                width: `${completion}%`,
              }}
            />

          </div>

          <strong>

            {completion}%

          </strong>

        </div>

      </section>

      {/* ==========================================
          TOP GRID
      ========================================== */}

      <section className="dashboard-top-grid">

        <MemberCard />

        <DashboardStats />

      </section>

      {/* ==========================================
          QUICK ACTIONS
      ========================================== */}

      <QuickActions />

      {/* ==========================================
          CONTENT GRID
      ========================================== */}

      <section className="dashboard-grid">

        <div className="dashboard-left">

          <UpcomingEvents />

          <RecentNews />

        </div>

        <div className="dashboard-right">

          <NotificationPanel />

        </div>

      </section>

    </div>

  );

}

export default DashboardOverview;