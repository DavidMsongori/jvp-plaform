import {
  BadgeCheck,
  CalendarDays,
  CreditCard,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import { useProfile } from "../../context/ProfileContext";

import "./Profile.css";

/* =====================================================
   API URL
===================================================== */

const API_URL =
  (import.meta.env.VITE_API_URL || "")
    .replace("/api", "");

/* =====================================================
   PROFILE HEADER
===================================================== */

function ProfileHeader() {

  const {

    profile,

    fullName,

    profilePhoto,

    membershipNumber,

    membershipStatus,

    county,

    role,

  } = useProfile();

  const memberSince =

    profile?.memberSince

      ? new Date(

          profile.memberSince

        ).getFullYear()

      : "-";

  const photo =

    profilePhoto

      ? `${API_URL}${profilePhoto}`

      : "/images/default-avatar.png";

  return (

    <section className="profile-header">

      {/* ======================================
          LEFT
      ====================================== */}

      <div className="profile-header-left">

        <div className="profile-header-photo">

          <img

            src={photo}

            alt={fullName}

            onError={(event) => {

              event.target.src =
                "/images/default-avatar.png";

            }}

          />

        </div>

        <div className="profile-header-details">

          <h1>

            {fullName || "JVP Member"}

          </h1>

          <span className="profile-role">

            {role || "Member"}

          </span>

          <p>

            Welcome to your JVP Connect profile.

            Keep your information updated to enjoy all

            membership services.

          </p>

        </div>

      </div>

      {/* ======================================
          RIGHT
      ====================================== */}

      <div className="profile-header-summary">

        <div className="summary-card">

          <CreditCard size={18} />

          <div>

            <small>

              Membership Number

            </small>

            <strong>

              {membershipNumber || "-"}

            </strong>

          </div>

        </div>

        <div className="summary-card">

          <ShieldCheck size={18} />

          <div>

            <small>

              Status

            </small>

            <strong>

              {membershipStatus || "-"}

            </strong>

          </div>

        </div>

        <div className="summary-card">

          <MapPin size={18} />

          <div>

            <small>

              County

            </small>

            <strong>

              {county || "-"}

            </strong>

          </div>

        </div>

        <div className="summary-card">

          <CalendarDays size={18} />

          <div>

            <small>

              Member Since

            </small>

            <strong>

              {memberSince}

            </strong>

          </div>

        </div>

      </div>

      {/* ======================================
          VERIFIED BADGE
      ====================================== */}

      <div className="profile-verified">

        <BadgeCheck size={18} />

        Verified Member

      </div>

    </section>

  );

}

export default ProfileHeader;