import { useRef, useState } from "react";

import {
  Camera,
  LoaderCircle,
} from "lucide-react";

import {
  uploadProfilePhoto,
} from "../../services/member.service";

import {
  useProfile,
} from "../../context/ProfileContext";

import "./Profile.css";

/* =====================================================
   PROFILE PHOTO UPLOAD
===================================================== */

function ProfilePhotoUpload() {

  const {

    fullName,

    profilePhoto,

    reloadProfile,

  } = useProfile();

  const inputRef = useRef(null);

  const [uploading, setUploading] =
    useState(false);

  /* ==========================================
     IMAGE
  ========================================== */

  const image =
    profilePhoto ||
    "/images/default-avatar.png";

  /* ==========================================
     OPEN FILE PICKER
  ========================================== */

  const selectPhoto = () => {

    if (!uploading) {

      inputRef.current?.click();

    }

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

    /* ----------------------------
       FILE TYPE
    ---------------------------- */

    const allowedTypes = [

      "image/jpeg",

      "image/jpg",

      "image/png",

      "image/webp",

    ];

    if (

      !allowedTypes.includes(
        file.type
      )

    ) {

      alert(

        "Please select a JPG, PNG or WEBP image."

      );

      event.target.value = "";

      return;

    }

    /* ----------------------------
       FILE SIZE (2 MB)
    ---------------------------- */

    if (

      file.size >

      2 * 1024 * 1024

    ) {

      alert(

        "Image must be smaller than 2 MB."

      );

      event.target.value = "";

      return;

    }

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

          Click your profile photo to upload a new picture.

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