import { useState } from "react";

import { useProfile } from "../../context/ProfileContext";

import MembershipCardFront from "../../components/membership/MembershipCardFront";
import MembershipCardBack from "../../components/membership/MembershipCardBack";
import MembershipCardActions from "../../components/membership/MembershipCardActions";

import "../../components/membership/MembershipCard.css";

/* =====================================================
   MEMBERSHIP CARD
===================================================== */

function MembershipCard() {

  const {

    profile,

    loading,

    error,

  } = useProfile();

  const [

    flipped,

    setFlipped,

  ] = useState(false);

  /* ==========================================
     LOADING
  ========================================== */

  if (loading) {

    return (

      <div className="membership-page">

        <div className="membership-loading">

          <div className="profile-spinner" />

          <h3>

            Loading Membership Card...

          </h3>

        </div>

      </div>

    );

  }

  /* ==========================================
     ERROR
  ========================================== */

  if (error) {

    return (

      <div className="membership-page">

        <div className="membership-error">

          <h2>

            Unable to load membership card

          </h2>

          <p>

            {error}

          </p>

        </div>

      </div>

    );

  }

  if (!profile) {

    return (

      <div className="membership-page">

        <div className="membership-error">

          <h2>

            Membership information unavailable.

          </h2>

        </div>

      </div>

    );

  }

  /* ==========================================
     PAGE
  ========================================== */

  return (

    <div className="membership-page">

      <div className="membership-card-stage">

        <div

          className={

            flipped

              ? "membership-card-flip flipped"

              : "membership-card-flip"

          }

        >

          {/* FRONT */}

          <div className="membership-face membership-front">

            <MembershipCardFront

              card={profile}

            />

          </div>

          {/* BACK */}

          <div className="membership-face membership-back">

            <MembershipCardBack

              card={profile}

            />

          </div>

        </div>

      </div>

      {/* ======================================
          FLIP BUTTON
      ====================================== */}

      <div className="membership-flip-controls">

        <button

          className="flip-card-btn"

          onClick={() =>

            setFlipped(

              !flipped

            )

          }

        >

          {

            flipped

              ? "Show Front"

              : "Show Back"

          }

        </button>

      </div>

      {/* ======================================
          ACTIONS
      ====================================== */}

      <MembershipCardActions

        card={profile}

      />

    </div>

  );

}

export default MembershipCard;