import { useRef, useState } from "react";

import {
  Camera,
  LoaderCircle,
  User,
} from "lucide-react";

import {
  uploadProfilePhoto,
} from "../../services/member.service";

import {
  useProfile,
} from "../../context/ProfileContext";

import "./Profile.css";

/* =====================================================
   API
===================================================== */

const API_URL =
  (import.meta.env.VITE_API_URL || "")
    .replace("/api", "");

/* =====================================================
   PROFILE PHOTO UPLOAD
===================================================== */

function ProfilePhotoUpload() {

  const {

    profile,

    fullName,

    profilePhoto,

    reloadProfile,

  } = useProfile();

  const inputRef =
    useRef(null);

  const [uploading, setUploading] =
    useState(false);

  /* ==========================================
     IMAGE
  ========================================== */

  const image =

    profilePhoto

      ? profilePhoto.startsWith("http")

        ? profilePhoto

        : `${API_URL}${profilePhoto}`

      : "/images/default-avatar.png";

  /* ==========================================
     OPEN FILE PICKER
  ========================================== */

  const selectPhoto = () => {

    inputRef.current?.click();

  };

  /* ==========================================
     UPLOAD PHOTO
  ========================================== */

  const handleUpload = async (

    event

  ) => {

    const file =
      event.target.files?.[0];

    if (!file) return;

    try {

      setUploading(true);

      await uploadProfilePhoto(file);

      await reloadProfile();

    }

    catch (error) {

      console.error(error);

      alert(

        error.response?.data?.message ||

        "Unable to upload profile photo."

      );

    }

    finally {

      setUploading(false);

      event.target.value = "";

    }

  };

  return (

    <section className="profile-photo-card">

      {/* ======================================
          PHOTO
      ====================================== */}

      <div

        className="profile-photo-wrapper"

        onClick={selectPhoto}

      >

        <img

          src={image}

          alt={

            fullName ||

            "Profile Photo"

          }

          onError={(event) => {

            event.target.src =
              "/images/default-avatar.png";

          }}

        />

        <div className="photo-overlay">

          {

            uploading ? (

              <LoaderCircle

                className="spin"

                size={24}

              />

            ) : (

              <Camera

                size={24}

              />

            )

          }

        </div>

      </div>

      {/* ======================================
          DETAILS
      ====================================== */}

      <div className="profile-photo-details">

        <h3>

          {fullName ||

            "JVP Member"}

        </h3>

        <p>

          Click your profile photo to upload

          a new picture.

        </p>

      </div>

      {/* ======================================
          INPUT
      ====================================== */}

      <input

        ref={inputRef}

        type="file"

        hidden

        accept="image/png,image/jpeg,image/jpg,image/webp"

        onChange={handleUpload}

      />

    </section>

  );

}

export default ProfilePhotoUpload;