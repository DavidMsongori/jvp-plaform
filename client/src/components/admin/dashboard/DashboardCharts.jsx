import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

import SectionCard from "../common/SectionCard";

import "./DashboardCharts.css";

const DashboardCharts = ({
  membersData = [],
  revenueData = [],
}) => {
  return (
    <div className="dashboard-charts">

      <SectionCard
        title="Membership Growth"
        subtitle="Monthly registrations"
      >

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <LineChart
            data={membersData}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              dataKey="members"
              stroke="#0d6efd"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </SectionCard>

      <SectionCard
        title="Revenue"
        subtitle="Monthly income"
      >

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <BarChart
            data={revenueData}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="revenue"
              fill="#198754"
              radius={[8,8,0,0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </SectionCard>

    </div>
  );
};

export default DashboardCharts;