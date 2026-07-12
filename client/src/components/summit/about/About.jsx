import "./About.css";
import { CheckCircle2 } from "lucide-react";

const highlights = [
  "Youth Leadership & Governance",
  "Innovation & Entrepreneurship",
  "Blue Economy Opportunities",
  "Climate Action & Sustainability",
  "Networking & Partnerships",
  "Policy Dialogue & Advocacy",
];

export default function About() {
  return (
    <section id="about" className="about">

      <div className="about-container">

        {/* LEFT */}

        <div className="about-image">

          <img
            src="/images/about/about.jpg"
            alt="Coastal Youth Summit"
          />

        </div>

        {/* RIGHT */}

        <div className="about-content">

          <span className="section-tag">
            ABOUT THE SUMMIT
          </span>

          <h2>
            Empowering Coastal Youth to Shape the Future
          </h2>

          <p>
            The Coastal Youth Summit is the flagship annual gathering
            of young leaders, innovators, entrepreneurs,
            policymakers, development partners and community
            organizations across Kenya's Coast Region.

            The summit creates a platform for dialogue, innovation,
            collaboration and action to unlock opportunities for
            sustainable economic growth and youth empowerment.
          </p>

          <div className="about-highlights">

            {highlights.map((item) => (

              <div
                key={item}
                className="highlight-item"
              >

                <CheckCircle2 size={20} />

                <span>{item}</span>

              </div>

            ))}

          </div>

          <a
            href="#tracks"
            className="about-button"
          >
            Explore Summit Tracks
          </a>

        </div>

      </div>

    </section>
  );
}