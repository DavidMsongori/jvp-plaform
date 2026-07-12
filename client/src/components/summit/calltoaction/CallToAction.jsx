import "./CallToAction.css";
import {
  ArrowRight,
  Handshake,
  Users,
  CalendarDays,
  Globe,
} from "lucide-react";

export default function CallToAction() {
  return (
    <section
      id="register"
      className="cta"
      style={{
        backgroundImage: "url('/images/cta/cta-bg.jpg')",
      }}
    >
      <div className="cta-overlay"></div>

      <div className="cta-container">

        <div className="cta-content">

          <span className="section-tag">
            COASTAL YOUTH SUMMIT 2026
          </span>

          <h2>
            Ready to Shape the Future of Coastal Youth?
          </h2>

          <p>
            Join thousands of young leaders, entrepreneurs,
            innovators, policymakers and development partners
            for an unforgettable day of inspiration,
            collaboration and opportunity.
          </p>

          <div className="cta-stats">

            <div className="cta-stat">

              <Users size={24} />

              <div>

                <h3>10,000+</h3>

                <span>Participants</span>

              </div>

            </div>

            <div className="cta-stat">

              <Globe size={24} />

              <div>

                <h3>50+</h3>

                <span>Partners</span>

              </div>

            </div>

            <div className="cta-stat">

              <CalendarDays size={24} />

              <div>

                <h3>1 Day</h3>

                <span>Experience</span>

              </div>

            </div>

          </div>

          <div className="cta-buttons">

            <a
              href="#registration"
              className="cta-primary"
            >

              Register Now

              <ArrowRight size={20} />

            </a>

            <a
              href="#partners"
              className="cta-secondary"
            >

              <Handshake size={20} />

              Become a Partner

            </a>

          </div>

        </div>

      </div>

    </section>
  );
}