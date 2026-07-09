import { QRCodeSVG } from "qrcode.react";

import "./MembershipCard.css";

/* =====================================================
   MEMBERSHIP QR CODE
===================================================== */

function MembershipQRCode({

  member,

}) {

  /* ==========================================
     MEMBER DATA
  ========================================== */

  const qrData = JSON.stringify({

    id: member?._id,

    membershipNumber:
      member?.membershipNumber,

    firstName:
      member?.firstName,

    middleName:
      member?.middleName,

    lastName:
      member?.lastName,

    county:
      member?.location?.county,

    membershipStatus:
      member?.membershipStatus,

    activationStatus:
      member?.activationStatus,

    role:
      member?.role,

  });

  return (

    <div className="membership-qr">

      <QRCodeSVG

        value={qrData}

        size={120}

        bgColor="#FFFFFF"

        fgColor="#16325B"

        level="H"

        includeMargin={true}

      />

      <small>

        Scan to verify membership

      </small>

    </div>

  );

}

export default MembershipQRCode;