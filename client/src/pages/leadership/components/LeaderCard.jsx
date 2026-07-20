import "./LeaderCard.css";

import {
  MapPin,
  Briefcase,
} from "lucide-react";

const DEFAULT_AVATAR = "/avatar.png";

export default function LeaderCard({ leader }) {
  if (!leader) return null;

  /* ==========================================================
     PROFILE
  ========================================================== */

  const profile = leader.profile || {};

  const photo =
    typeof profile.profilePhoto === "object"
      ? profile.profilePhoto?.url
      : profile.profilePhoto;

  const fullName =
    profile.fullName || "Unknown Leader";

  const county =
    profile.county ||
    leader.county ||
    "";

  const position =
    leader.position || "";

  const category =
    leader.category
      ?.replaceAll("_", " ")
      .replace(
        /\b\w/g,
        (char) => char.toUpperCase()
      );

  /* ==========================================================
     UI
  ========================================================== */

  return (
    <article className="leader-card">

      {/* ======================================
          PHOTO
      ======================================= */}

      <div className="leader-photo">

        <img
          src={photo || DEFAULT_AVATAR}
          alt={fullName}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src =
              DEFAULT_AVATAR;
          }}
        />

      </div>

      {/* ======================================
          CONTENT
      ======================================= */}

      <div className="leader-content">

        <span className="leader-category">

          {category}

        </span>

        <h3>

          {fullName}

        </h3>

        <div className="leader-position">

          <Briefcase size={16} />

          <span>

            {position}

          </span>

        </div>

        {county && (

          <div className="leader-location">

            <MapPin size={16} />

            <span>

              {county}

            </span>

          </div>

        )}

      </div>

    </article>
  );
}