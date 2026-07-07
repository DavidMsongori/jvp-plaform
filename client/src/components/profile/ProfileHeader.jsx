import { useRef, useState } from "react";
import {
  Camera,
  User,
  LoaderCircle,
} from "lucide-react";

import {
  uploadProfilePhoto,
} from "../../services/member.service";

import {
  useDashboard,
} from "../../context/DashboardContext";

import "./ProfileHeader.css";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "";

function ProfileHeader() {

  const {

    member,

    reloadDashboard,

  } = useDashboard();

  const inputRef = useRef(null);

  const [uploading, setUploading] =
    useState(false);

  const fullName = [

    member?.firstName,

    member?.middleName,

    member?.lastName,

  ]

    .filter(Boolean)

    .join(" ");

  const openFilePicker = () => {

    inputRef.current?.click();

  };

  const handlePhotoUpload = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    try {

      setUploading(true);

      await uploadProfilePhoto(file);

      await reloadDashboard();

    } catch (error) {

      console.error(

        "Upload failed",

        error

      );

      alert(

        error.response?.data?.message ||

        "Unable to upload profile photo."

      );

    } finally {

      setUploading(false);

      e.target.value = "";

    }

  };

  return (

    <section className="profile-header dashboard-card">

      <div className="profile-header-left">

        <div
          className="profile-avatar"
          onClick={openFilePicker}
        >

          {

            member?.profilePhoto ? (

              <img

                src={`${API_BASE_URL}${member.profilePhoto}`}

                alt={fullName}

              />

            ) : (

              <User size={55} />

            )

          }

          <div className="camera-overlay">

            {

              uploading ? (

                <LoaderCircle
                  size={20}
                  className="spin"
                />

              ) : (

                <Camera size={20} />

              )

            }

          </div>

        </div>

        <input

          ref={inputRef}

          type="file"

          accept="image/*"

          hidden

          onChange={handlePhotoUpload}

        />

        <div className="profile-details">

          <h1>

            {fullName}

          </h1>

          <p>

            {member?.membershipNumber}

          </p>

          <span>

            {member?.role
              ?.replace(/_/g, " ")
              .replace(/\b\w/g, c => c.toUpperCase())}

          </span>

        </div>

      </div>

      <div className="profile-status">

        <div>

          <small>

            Membership Status

          </small>

          <strong>

            {member?.membershipStatus}

          </strong>

        </div>

        <div>

          <small>

            Profile Completion

          </small>

          <strong>

            {member?.profileCompleted}%

          </strong>

        </div>

      </div>

    </section>

  );

}

export default ProfileHeader;