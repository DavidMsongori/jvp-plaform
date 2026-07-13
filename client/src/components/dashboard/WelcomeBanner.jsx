import { Link } from "react-router-dom";
import {
  FiCheckCircle,
  FiMapPin,
  FiCreditCard,
  FiArrowRight,
} from "react-icons/fi";

import "./WelcomeBanner.css";

function WelcomeBanner({ member }) {
  if (!member) return null;

  const firstName =
    member.firstName || "Member";

  return (
    <section className="welcome-banner">

      <div className="welcome-banner-left">

        <span className="welcome-tag">
          👋 Welcome Back
        </span>

        <h1>
          Hello, {firstName}
        </h1>

        <p>
          Welcome back to JVP Connect.
          Manage your membership,
          discover opportunities,
          register for events and stay
          connected with the Coastal
          Youth Community.
        </p>

        <div className="welcome-meta">

          <div className="meta-item">

            <FiCreditCard />

            <span>
              {member.membershipNumber ||
                "Pending Membership Number"}
            </span>

          </div>

          <div className="meta-item">

            <FiMapPin />

            <span>{member.county}</span>

          </div>

          <div className="meta-item status">

            <FiCheckCircle />

            <span>
              {member.membershipStatus}
            </span>

          </div>

        </div>

      </div>

      <div className="welcome-banner-right">

        <div className="completion-card">

          <h3>
            Profile Completion
          </h3>

          <div className="progress-circle">

            <span>
              {member.profileCompletion || 72}%
            </span>

          </div>

          <p>
            Complete your profile to
            unlock all JVP services.
          </p>

          <Link
            to="/dashboard/profile"
            className="complete-profile-btn"
          >
            Complete Profile

            <FiArrowRight />

          </Link>

        </div>

      </div>

    </section>
  );
}

export default WelcomeBanner;