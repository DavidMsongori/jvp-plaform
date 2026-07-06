import MemberCard from "./MemberCard";
import DashboardStats from "./DashboardStats";
import QuickActions from "./QuickActions";
import UpcomingEvents from "./UpcomingEvents";
import RecentNews from "./RecentNews";
import NotificationPanel from "./NotificationPanel";

import "./DashboardOverview.css";

function DashboardOverview() {
  return (
    <div className="dashboard-overview">

      {/* Top Row */}

      <section className="dashboard-top">

        <MemberCard />

        <DashboardStats />

      </section>

      {/* Quick Actions */}

      <section className="dashboard-section">

        <QuickActions />

      </section>

      {/* Bottom Widgets */}

      <section className="dashboard-bottom">

        <div className="dashboard-column">

          <UpcomingEvents />

          <RecentNews />

        </div>

        <div className="dashboard-column">

          <NotificationPanel />

        </div>

      </section>

    </div>
  );
}

export default DashboardOverview;