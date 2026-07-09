import {
  BadgeCheck,
  CalendarDays,
  CreditCard,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import logo from "../../assets/images/jvp-logo.png";

import "./MembershipCard.css";

/* =====================================================
   MEMBERSHIP CARD FRONT
===================================================== */

function MembershipCardFront({ card }) {

  const fullName = [

    card?.firstName,

    card?.middleName,

    card?.lastName,

  ]

    .filter(Boolean)

    .join(" ");

  /*
    Display leadership position if available.
    Otherwise fall back to the system role.
  */

  const displayPosition =

    card?.leadership?.position ||

    card?.position ||

    card?.role ||

    "Member";

  const memberSince =

    card?.memberSince

      ? new Date(

          card.memberSince

        ).getFullYear()

      : "-";

  return (

    <div className="membership-card">

      {/* ======================================
          SHINE
      ====================================== */}

      <div className="card-shine" />

      {/* ======================================
          WATERMARK
      ====================================== */}

      <div className="membership-watermark">

        <img

          src={logo}

          alt="JVP"

        />

      </div>

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="card-header">

        <div />

        <div className="verified-badge">

          VERIFIED

        </div>

      </div>

      {/* ======================================
          MEMBER
      ====================================== */}

      <div className="card-profile">

        <div className="profile-photo">

          {

            card?.profilePhotoUrl ? (

              <img

                src={card.profilePhotoUrl}

                alt={fullName}

              />

            ) : (

              <div className="profile-placeholder">

                {

                  fullName

                    ? fullName.charAt(0)

                    : "J"

                }

              </div>

            )

          }

        </div>

        <div className="profile-details">

          <h3>

            {fullName ||

              "JVP Member"}

          </h3>

          <span className="role-badge">

            {displayPosition}

          </span>

        </div>

        <div className="card-chip">

          <span />

          <span />

          <span />

          <span />

        </div>

      </div>

      {/* ======================================
          MEMBER INFORMATION
      ====================================== */}

      <div className="card-information">

        <div className="info-item">

          <CreditCard size={18} />

          <div>

            <small>

              Membership Number

            </small>

            <strong>

              {

                card?.membershipNumber ||

                "-"

              }

            </strong>

          </div>

        </div>

        <div className="info-item">

          <MapPin size={18} />

          <div>

            <small>

              County

            </small>

            <strong>

              {

                card?.location?.county ||

                "-"

              }

            </strong>

          </div>

        </div>

        <div className="info-item">

          <ShieldCheck size={18} />

          <div>

            <small>

              Status

            </small>

            <strong>

              {

                card?.membershipStatus ||

                "-"

              }

            </strong>

          </div>

        </div>

        <div className="info-item">

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
          FOOTER
      ====================================== */}

      <div className="card-footer">

        <small>

          Official Digital Membership Card

        </small>

        <div className="footer-status">

          <BadgeCheck size={14} />

          Verified Member

        </div>

      </div>

    </div>

  );

}

export default MembershipCardFront;