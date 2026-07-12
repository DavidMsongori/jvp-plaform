import { Link } from "react-router-dom";
import {
  CalendarDays,
  MapPin,
  Users,
} from "lucide-react";

import SectionCard from "../common/SectionCard";
import EmptyState from "../common/EmptyState";

import "./UpcomingEvents.css";

const UpcomingEvents = ({ events = [] }) => {
  return (
    <SectionCard
      title="Upcoming Events"
      subtitle="Events scheduled soon."
      action={
        <Link
          to="/admin/events"
          className="btn btn-sm btn-outline-primary"
        >
          View All
        </Link>
      }
    >
      {events.length === 0 ? (
        <EmptyState
          title="No Upcoming Events"
          message="No scheduled events."
        />
      ) : (
        <div className="upcoming-events">

          {events.map((event) => (

            <div
              key={event._id}
              className="event-item"
            >

              <div className="event-icon">
                <CalendarDays size={22} />
              </div>

              <div className="event-info">

                <h6>{event.title}</h6>

                <small>

                  <MapPin size={14} />

                  {event.location}

                </small>

              </div>

              <div className="event-meta">

                <div>

                  {new Date(
                    event.startDate
                  ).toLocaleDateString()}

                </div>

                <small>

                  <Users size={14} />

                  {event.registeredCount || 0}

                </small>

              </div>

            </div>

          ))}

        </div>
      )}
    </SectionCard>
  );
};

export default UpcomingEvents;