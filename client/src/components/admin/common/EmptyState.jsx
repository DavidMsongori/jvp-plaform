import { Inbox } from "lucide-react";
import "./EmptyState.css";

const EmptyState = ({
  title = "No data found",
  message = "There is nothing to display.",
  icon: Icon = Inbox,
  action,
}) => {
  return (
    <div className="empty-state">

      <div className="empty-icon">
        <Icon size={60} />
      </div>

      <h4>{title}</h4>

      <p>{message}</p>

      {action && (
        <div className="empty-action">
          {action}
        </div>
      )}

    </div>
  );
};

export default EmptyState;