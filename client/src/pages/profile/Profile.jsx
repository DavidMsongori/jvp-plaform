import { useProfile } from "../../context/ProfileContext";

import ProfileHero from "../profile/components/ProfileHero";
import ProfileSidebar from "../profile/components/ProfileSidebar";
import ProfileTabs from "../profile/components/ProfileTabs";

import "./Profile.css";

/* =====================================================
   PROFILE PAGE
===================================================== */

function Profile() {

  const {

    loading,

    error,

  } = useProfile();

  /* ==========================================
     LOADING
  ========================================== */

  if (loading) {

    return (

      <div className="profile-loading">

        <div className="profile-spinner" />

        <h3>

          Loading your profile...

        </h3>

      </div>

    );

  }

  /* ==========================================
     ERROR
  ========================================== */

  if (error) {

    return (

      <div className="profile-error">

        <h2>

          Unable to load profile

        </h2>

        <p>

          {error}

        </p>

      </div>

    );

  }

  /* ==========================================
     PAGE
  ========================================== */

  return (

    <div className="profile-page">

      {/* ======================================
          HERO
      ====================================== */}

      <ProfileHero />

      {/* ======================================
          CONTENT
      ====================================== */}

      <div className="profile-content">

        {/* ==============================
            SIDEBAR
        =============================== */}

        <aside className="profile-sidebar-column">

          <ProfileSidebar />

        </aside>

        {/* ==============================
            MAIN CONTENT
        =============================== */}

        <section className="profile-main">

          <ProfileTabs />

        </section>

      </div>

    </div>

  );

}

export default Profile;