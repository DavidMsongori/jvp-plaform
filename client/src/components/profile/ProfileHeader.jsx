import {
  BadgeCheck,
  CalendarDays,
  CreditCard,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import {
  useProfile,
} from "../../context/ProfileContext";

import "./Profile.css";

/* =====================================================
   PROFILE HEADER
===================================================== */

function ProfileHeader() {

  const {

    profile,

    fullName,

    profilePhoto,

    membershipStatus,

  } = useProfile();

  if (!profile) return null;

  const memberSince =

    profile.joinedAt

      ? new Date(

          profile.joinedAt

        ).getFullYear()

      : "-";

  return (

    <section className="profile-header">

      {/* ======================================
          LEFT
      ====================================== */}

      <div className="profile-header-left">

        <div className="profile-header-photo">

          <img

            src={
              profilePhoto ||
              "/images/default-avatar.png"
            }

            alt={

              fullName ||

              "JVP Member"

            }

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

            {profile.role || "Member"}

          </span>

          <p>

            Welcome to your JVP Connect profile.

            Keep your information updated to

            enjoy all membership services.

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

              {profile.memberNumber || "-"}

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

              {profile.county || "-"}

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