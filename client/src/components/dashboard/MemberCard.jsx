import {
  User,
  MapPin,
  CreditCard,
  ShieldCheck,
  CalendarDays,
} from "lucide-react";

import { useDashboard } from "../../context/DashboardContext";

import "./MemberCard.css";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "";

function MemberCard() {

  const {

    member,

    loading,

    error,

  } = useDashboard();

  if (loading) {

    return (

      <section className="member-card dashboard-card">

        <div className="empty-state">

          Loading member information...

        </div>

      </section>

    );

  }

  if (error) {

    return (

      <section className="member-card dashboard-card">

        <div className="empty-state">

          {error}

        </div>

      </section>

    );

  }

  if (!member) {

    return (

      <section className="member-card dashboard-card">

        <div className="empty-state">

          Member information unavailable.

        </div>

      </section>

    );

  }

  const fullName = [

    member.firstName,

    member.middleName,

    member.lastName,

  ]

    .filter(Boolean)

    .join(" ");

  const memberSince = member.memberSince

    ? new Date(member.memberSince)

        .getFullYear()

    : "-";

  return (

    <section className="member-card dashboard-card">

      {/* ==========================================
          MEMBER HEADER
      ========================================== */}

      <div className="member-header">

        <div className="member-avatar">

          {

            member.profilePhoto ? (

              <img

                src={`${API_BASE_URL}${member.profilePhoto}`}

                alt={fullName}

              />

            ) : (

              <User size={46} />

            )

          }

        </div>

        <div className="member-name">

          <h2>

            {fullName}

          </h2>

          <span className="member-role">

            {

              member.role

                ?.replace(/_/g, " ")

                .replace(

                  /\b\w/g,

                  c => c.toUpperCase()

                )

            }

          </span>

        </div>

      </div>

      {/* ==========================================
          MEMBER DETAILS
      ========================================== */}

      <div className="member-details">

        <div className="detail-item">

          <CreditCard size={18} />

          <div>

            <small>

              Membership No.

            </small>

            <strong>

              {member.membershipNumber}

            </strong>

          </div>

        </div>

        <div className="detail-item">

          <MapPin size={18} />

          <div>

            <small>

              County

            </small>

            <strong>

              {member.county || "-"}

            </strong>

          </div>

        </div>

        <div className="detail-item">

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

        <div className="detail-item">

          <ShieldCheck size={18} />

          <div>

            <small>

              Status

            </small>

            <strong>

              {member.membershipStatus}

            </strong>

          </div>

        </div>

      </div>

      {/* ==========================================
          PROFILE COMPLETION
      ========================================== */}

      <div className="profile-progress">

        <div className="progress-header">

          <span>

            Profile Completion

          </span>

          <strong>

            {member.profileCompleted || 0}%

          </strong>

        </div>

        <div className="progress-bar">

          <div

            className="progress-fill"

            style={{

              width: `${member.profileCompleted || 0}%`,

            }}

          />

        </div>

      </div>

    </section>

  );

}

export default MemberCard;