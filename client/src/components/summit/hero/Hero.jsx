import "./Hero.css";
import {
  CalendarDays,
  Clock3,
  MapPin,
  ArrowRight,
} from "lucide-react";

const stats = [
  {
    value: "10,000+",
    label: "Participants",
  },
  {
    value: "100+",
    label: "Speakers",
  },
  {
    value: "50+",
    label: "Partners",
  },
  {
    value: "6",
    label: "Coastal Counties",
  },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="hero"
      style={{
        backgroundImage: "url('/images/hero/hero.jpg')",
      }}
    >
      <div className="hero-overlay"></div>

      <div className="hero-container">

        <div className="hero-content">

          <span className="hero-badge">
            FIRST EDITION • 2026
          </span>

          <h1>
            Coastal Youth
            <br />
            Summit 2026
          </h1>

          <p className="hero-theme">
            <strong>Theme:</strong> Blue Horizons Rising:
            Youth Economic Empowerment Through Innovation,
            Enterprise & Sustainable Development.
          </p>

          <div className="hero-details">

            <div>

              <CalendarDays size={20} />

              Thursday, 6 August 2026

            </div>

            <div>

              <Clock3 size={20} />

              8:00 AM - 5:00 PM

            </div>

            <div>

              <MapPin size={20} />

              Malindi, Kilifi County

            </div>

          </div>

          <div className="hero-buttons">

            <a
              href="#register"
              className="primary-btn"
            >
              Register Now

              <ArrowRight size={18} />

            </a>

            <a
              href="#partners"
              className="secondary-btn"
            >
              Become a Partner
            </a>

          </div>

        </div>

        <div className="hero-stats">

          {stats.map((item) => (

            <div
              key={item.label}
              className="stat-card"
            >

              <h2>{item.value}</h2>

              <span>{item.label}</span>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}