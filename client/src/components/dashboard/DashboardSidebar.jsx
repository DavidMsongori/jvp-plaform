import { Link } from "react-router-dom";

import "./DashboardSidebar.css";

function DashboardSidebar() {

  return (

    <aside className="dashboard-sidebar">

      <div className="sidebar-logo">

        <h2>

          JVP Connect

        </h2>

      </div>

      <nav>

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/dashboard/profile">
          My Profile
        </Link>

        <Link to="/dashboard/membership-card">
          Membership Card
        </Link>

        <Link to="/dashboard/events">
          Events
        </Link>

        <Link to="/dashboard/programs">
          Programs
        </Link>

        <Link to="/dashboard/certificates">
          Certificates
        </Link>

        <Link to="/dashboard/notifications">
          Notifications
        </Link>

        <Link to="/dashboard/settings">
          Settings
        </Link>

      </nav>

    </aside>

  );

}

export default DashboardSidebar;