import {
  UserPlus,
  CreditCard,
  CalendarDays,
  CheckCircle,
} from "lucide-react";

import SectionCard from "../common/SectionCard";
import EmptyState from "../common/EmptyState";

import "./RecentActivity.css";

const icons = {
  MEMBER_REGISTERED: UserPlus,
  PAYMENT_RECEIVED: CreditCard,
  EVENT_CREATED: CalendarDays,
  MEMBER_APPROVED: CheckCircle,
};

const RecentActivity = ({ activities = [] }) => {
  return (
    <SectionCard
      title="Recent Activity"
      subtitle="Latest system activity."
    >
      {activities.length === 0 ? (
        <EmptyState
          title="No Activity"
          message="No recent activity."
        />
      ) : (
        <div className="activity-list">

          {activities.map((activity) => {

            const Icon =
              icons[activity.type] || UserPlus;

            return (

              <div
                className="activity-item"
                key={activity._id}
              >

                <div className="activity-icon">
                  <Icon size={18} />
                </div>

                <div className="activity-content">

                  <h6>{activity.title}</h6>

                  <p>{activity.description}</p>

                </div>

                <small>

                  {activity.time}

                </small>

              </div>

            );

          })}

        </div>
      )}
    </SectionCard>
  );
};

export default RecentActivity;