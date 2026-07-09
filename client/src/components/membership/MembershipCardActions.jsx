import {
  Printer,
  Download,
  RefreshCw,
  UserRoundPen,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useProfile } from "../../context/ProfileContext";

import "./MembershipCard.css";

/* =====================================================
   MEMBERSHIP CARD ACTIONS
===================================================== */

function MembershipCardActions() {

  const navigate =
    useNavigate();

  const {

    reloadProfile,

  } = useProfile();

  /* ==========================================
     PRINT
  ========================================== */

  const handlePrint = () => {

    window.print();

  };

  /* ==========================================
     DOWNLOAD
  ========================================== */

  const handleDownload = () => {

    alert(

      "PDF download will be available soon."

    );

  };

  /* ==========================================
     REFRESH
  ========================================== */

  const handleRefresh = async () => {

    await reloadProfile();

  };

  /* ==========================================
     EDIT PROFILE
  ========================================== */

  const handleEdit = () => {

    navigate(

      "/dashboard/profile"

    );

  };

  return (

    <div className="membership-actions">

      <button

        onClick={handlePrint}

        className="membership-btn"

      >

        <Printer size={18} />

        Print Card

      </button>

      <button

        onClick={handleDownload}

        className="membership-btn"

      >

        <Download size={18} />

        Download PDF

      </button>

      <button

        onClick={handleRefresh}

        className="membership-btn"

      >

        <RefreshCw size={18} />

        Refresh

      </button>

      <button

        onClick={handleEdit}

        className="membership-btn primary"

      >

        <UserRoundPen size={18} />

        Edit Profile

      </button>

    </div>

  );

}

export default MembershipCardActions;