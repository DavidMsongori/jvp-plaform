import { Link } from "react-router-dom";
import {
  CalendarPlus,
  Users,
  ArrowRight,
} from "lucide-react";

const NewsletterCTA = () => {
  return (
    <section className="events-cta">

      <div className="events-cta__content">

        <span className="events-cta__eyebrow">
          NEVER MISS AN EVENT
        </span>

        <h2 className="events-cta__title">
          Join the JVP Community
        </h2>

        <p className="events-cta__description">
          Stay informed about conferences, summits,
          trainings, youth forums, networking sessions,
          community service activities, and leadership
          opportunities taking place across the Coast
          Region and beyond.
        </p>

        <div className="events-cta__actions">

          <Link
            to="/membership/register"
            className="events-button events-button--primary"
          >
            <Users size={20} />
            Become a Member
          </Link>

          <Link
            to="/contact"
            className="events-button events-button--secondary"
          >
            <CalendarPlus size={20} />
            Stay Connected
            <ArrowRight size={18} />
          </Link>

        </div>

      </div>

    </section>
  );
};

export default NewsletterCTA;