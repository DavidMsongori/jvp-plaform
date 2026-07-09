import {
  ShieldCheck,
  Phone,
  Globe,
  Mail,
  MapPin,
} from "lucide-react";

import MembershipQRCode from "./MembershipQRCode";

import logo from "../../assets/images/jvp-logo.png";

import "./MembershipCard.css";

/* =====================================================
   MEMBERSHIP CARD BACK
===================================================== */

function MembershipCardBack({ card }) {

  const fullName = [

    card?.firstName,

    card?.middleName,

    card?.lastName,

  ]

    .filter(Boolean)

    .join(" ");

  return (

    <div className="membership-card membership-card-back">

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

      <div className="card-back-header">

        <ShieldCheck size={22} />

        <h2>

          JVP CONNECT

        </h2>

      </div>

      {/* ======================================
          QR CODE
      ====================================== */}

      <div className="card-back-qr">

        <MembershipQRCode

          member={card}

        />

      </div>

      {/* ======================================
          MEMBER DETAILS
      ====================================== */}

      <div className="card-back-member">

        <h3>

          {fullName || "JVP Member"}

        </h3>

        <p>

          Membership No.

          <strong>

            {card?.membershipNumber || "-"}

          </strong>

        </p>

      </div>

      {/* ======================================
          ORGANIZATION
      ====================================== */}

      <div className="card-back-info">

        <div>

          <MapPin size={15} />

          <span>

            Coast Region, Kenya

          </span>

        </div>

        <div>

          <Phone size={15} />

          <span>

            +254 740 504 969

          </span>

        </div>

        <div>

          <Mail size={15} />

          <span>

            info@jumuiyapwani.org

          </span>

        </div>

        <div>

          <Globe size={15} />

          <span>

            www.jumuiyapwani.org

          </span>

        </div>

      </div>

      {/* ======================================
          DISCLAIMER
      ====================================== */}

      <div className="card-back-footer">

        <p>

          This card remains the property of

          Jumuiya ya Vijana wa Pwani (JVP).

          If found, kindly return it to the

          organization.

        </p>

      </div>

    </div>

  );

}

export default MembershipCardBack;