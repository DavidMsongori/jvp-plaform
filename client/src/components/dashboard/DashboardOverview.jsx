import DashboardCard from "./DashboardCard";

function DashboardOverview() {
  return (
    <section className="dashboard-overview">

      <DashboardCard
        title="Membership Status"
        value="Active"
        icon="✅"
      />

      <DashboardCard
        title="Profile Completion"
        value="65%"
        icon="👤"
      />

      <DashboardCard
        title="Events"
        value="3"
        icon="📅"
      />

      <DashboardCard
        title="Certificates"
        value="1"
        icon="🏆"
      />

    </section>
  );
}

export default DashboardOverview;