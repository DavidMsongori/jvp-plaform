import {

  useProfile,

} from "../../context/ProfileContext";

import ProfileHeader from "../../components/profile/ProfileHeader";

import ProfilePhotoUpload from "../../components/profile/ProfilePhotoUpload";

import ProfileForm from "../../components/profile/ProfileForm";

import ProfileSidebar from "../../components/profile/ProfileSidebar";

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
          HEADER
      ====================================== */}

      <ProfileHeader />

      {/* ======================================
          BODY
      ====================================== */}

      <div className="profile-body">

        {/* ==============================
            LEFT
        =============================== */}

        <div className="profile-left">

          <ProfilePhotoUpload />

          <ProfileSidebar />

        </div>

        {/* ==============================
            RIGHT
        =============================== */}

        <div className="profile-right">

          <ProfileForm />

        </div>

      </div>

    </div>

  );

}

export default Profile;