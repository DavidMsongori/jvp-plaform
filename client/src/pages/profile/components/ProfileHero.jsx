import {
  BadgeCheck,
  CalendarDays,
  CreditCard,
  MapPin,
  ShieldCheck,
  Award,
  Camera,
} from "lucide-react";

import { useProfile } from "../../../context/ProfileContext";

import "./ProfileHero.css";

function ProfileHero() {

  const {
    profile,
    fullName,
    profilePhoto,
  } = useProfile();

  if (!profile) return null;

  const joinedYear = profile.joinedAt
    ? new Date(profile.joinedAt).getFullYear()
    : "-";

  const statusColor = (() => {

    switch (profile.membershipStatus) {

      case "active":
        return "status-active";

      case "pending_payment":
        return "status-pending";

      case "expired":
        return "status-expired";

      default:
        return "status-default";

    }

  })();

  return (

    <section className="profile-hero">

      {/* LEFT */}

      <div className="hero-left">

        <div className="hero-photo">

          <img

            src={
              profilePhoto ||
              "/images/default-avatar.png"
            }

            alt={fullName}

            onError={(e) => {

              e.target.src =
                "/images/default-avatar.png";

            }}

          />

          <button className="change-photo">

            <Camera size={18} />

          </button>

        </div>

        <div className="hero-details">

          <h1>

            {fullName}

          </h1>

          <div className="hero-badges">

            <span className="member-role">

              {profile.role || "Member"}

            </span>

            <span className="verified">

              <BadgeCheck size={16} />

              Verified Member

            </span>

          </div>

          <p>

            Welcome back to JVP Connect.

            Keep your profile updated to

            access events, leadership opportunities,

            certificates and member services.

          </p>

        </div>

      </div>

      {/* RIGHT */}

      <div className="hero-stats">

        <div className="hero-stat">

          <CreditCard size={22} />

          <small>Membership No.</small>

          <strong>

            {profile.memberNumber}

          </strong>

        </div>

        <div className="hero-stat">

          <ShieldCheck size={22} />

          <small>Status</small>

          <strong className={statusColor}>

            {profile.membershipStatus}

          </strong>

        </div>

        <div className="hero-stat">

          <MapPin size={22} />

          <small>County</small>

          <strong>

            {profile.county || "-"}

          </strong>

        </div>

        <div className="hero-stat">

          <CalendarDays size={22} />

          <small>Joined</small>

          <strong>

            {joinedYear}

          </strong>

        </div>

        <div className="hero-stat">

          <Award size={22} />

          <small>Category</small>

          <strong>

            {profile.membershipType}

          </strong>

        </div>

        <div className="hero-stat">

          <BadgeCheck size={22} />

          <small>Profile</small>

          <strong>

            72%

          </strong>

        </div>

      </div>

    </section>

  );

}

export default ProfileHero;