import { CalendarX, RotateCcw } from "lucide-react";

const EmptyState = ({
  title = "No Events Found",
  message = "We couldn't find any events matching your current search or filters. Try adjusting your filters or check back again soon.",
  buttonText = "Clear Filters",
  onAction,
}) => {
  return (
    <div className="events-empty">

      <div className="events-empty__icon">
        <CalendarX size={72} />
      </div>

      <h2 className="events-empty__title">
        {title}
      </h2>

      <p className="events-empty__message">
        {message}
      </p>

      {onAction && (
        <button
          type="button"
          className="events-button"
          onClick={onAction}
        >
          <RotateCcw size={18} />
          {buttonText}
        </button>
      )}

    </div>
  );
};

export default EmptyState;