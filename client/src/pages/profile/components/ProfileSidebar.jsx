import {
  Camera,
  CreditCard,
  BadgeCheck,
 CircleHelp,
  Download,
} from "lucide-react";

import { useProfile } from "../../../context/ProfileContext";

import "./ProfileSidebar.css";

function ProfileSidebar() {

  const {
    profile,
    fullName,
    profilePhoto,
  } = useProfile();

  if (!profile) return null;

  const completion = 72;

  return (

    <aside className="profile-sidebar">

      {/* ===========================
          MEMBER CARD
      ============================ */}

      <div className="sidebar-card">

        <img
          src={
            profilePhoto ||
            "/images/default-avatar.png"
          }
          alt={fullName}
          className="sidebar-avatar"
          onError={(e) => {
            e.target.src =
              "/images/default-avatar.png";
          }}
        />

        <h3>{fullName}</h3>

        <p className="member-number">

          {profile.memberNumber}

        </p>

        <span className="member-status">

          {profile.membershipStatus}

        </span>

      </div>

      {/* ===========================
          COMPLETION
      ============================ */}

      <div className="sidebar-section">

        <h4>

          Profile Completion

        </h4>

        <div className="progress">

          <div
            className="progress-fill"
            style={{
              width: `${completion}%`,
            }}
          />

        </div>

        <strong>

          {completion}%

        </strong>

      </div>

      {/* ===========================
          ACTIONS
      ============================ */}

      <div className="sidebar-section">

        <h4>

          Quick Actions

        </h4>

        <button className="action-btn">

          <Camera size={18} />

          Upload Photo

        </button>

        <button className="action-btn">

          <CreditCard size={18} />

          Membership Card

        </button>

        <button className="action-btn">

          <BadgeCheck size={18} />

          Renew Membership

        </button>

        <button className="action-btn">

          <Download size={18} />

          Certificates

        </button>

        <button className="action-btn">

          <CircleHelp size={18} />

          Help Center

        </button>

      </div>

    </aside>

  );

}

export default ProfileSidebar;