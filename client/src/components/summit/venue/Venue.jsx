import "./Venue.css";
import {
  MapPin,
  CalendarDays,
  Clock3,
  Navigation,
} from "lucide-react";

export default function Venue() {
  return (
    <section id="venue" className="venue">

      <div className="venue-container">

        {/* ================= LEFT ================= */}

        <div className="venue-content">

          <span className="section-tag">
            EVENT VENUE
          </span>

          <h2>
            Join Us in Beautiful Malindi
          </h2>

          <p>
            The Coastal Youth Summit 2026 will take place in
            <strong> Malindi, Kilifi County</strong>, bringing together
            over 10,000 young leaders, entrepreneurs, innovators,
            policymakers and development partners for a day of learning,
            networking and collaboration.
          </p>

          <div className="venue-details">

            <div className="venue-item">

              <MapPin size={22} />

              <div>

                <h4>Venue</h4>

                <p>Malindi, Kilifi County, Kenya</p>

              </div>

            </div>

            <div className="venue-item">

              <CalendarDays size={22} />

              <div>

                <h4>Date</h4>

                <p>Thursday, 6 August 2026</p>

              </div>

            </div>

            <div className="venue-item">

              <Clock3 size={22} />

              <div>

                <h4>Time</h4>

                <p>8:00 AM – 5:00 PM</p>

              </div>

            </div>

          </div>

          <div className="venue-buttons">

            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="venue-btn primary"
            >
              <Navigation size={18} />
              Get Directions
            </a>

            <a
              href="#register"
              className="venue-btn secondary"
            >
              Register Now
            </a>

          </div>

        </div>

        {/* ================= RIGHT ================= */}

        <div className="venue-image">

          <img
            src="/images/venue/venue.jpg"
            alt="Summit Venue"
          />

        </div>

      </div>

    </section>
  );
}