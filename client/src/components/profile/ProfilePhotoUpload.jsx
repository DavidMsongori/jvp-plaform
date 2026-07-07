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
  useDashboard,
} from "../../context/DashboardContext";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "";

function ProfilePhotoUpload({

  size = 140,

  editable = true,

}) {

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

  const openPicker = () => {

    if (!editable) return;

    inputRef.current?.click();

  };

  const handleUpload = async (event) => {

    const file =
      event.target.files?.[0];

    if (!file) return;

    try {

      setUploading(true);

      await uploadProfilePhoto(file);

      await reloadDashboard();

    } catch (error) {

      console.error(error);

      alert(

        error.response?.data?.message ||

        "Unable to upload profile photo."

      );

    } finally {

      setUploading(false);

      event.target.value = "";

    }

  };

  return (

    <>

      <div

        className="profile-avatar"

        style={{

          width: size,

          height: size,

        }}

        onClick={openPicker}

      >

        {

          member?.profilePhoto ? (

            <img

              src={`${API_BASE_URL}${member.profilePhoto}`}

              alt={fullName}

            />

          ) : (

            <User size={size * 0.45} />

          )

        }

        {

          editable && (

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

          )

        }

      </div>

      {

        editable && (

          <input

            ref={inputRef}

            type="file"

            accept="image/png,image/jpeg,image/jpg,image/webp"

            hidden

            onChange={handleUpload}

          />

        )

      }

    </>

  );

}

export default ProfilePhotoUpload;