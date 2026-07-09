import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getMyProfile,
} from "../services/member.service";

const ProfileContext = createContext();

const API_BASE_URL =
  (import.meta.env.VITE_API_URL || "")
    .replace("/api", "");

export function ProfileProvider({

  children,

}) {

  const [profile, setProfile] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* ==========================================
     LOAD PROFILE
  ========================================== */

  const loadProfile = async () => {

    try {

      setLoading(true);

      setError("");

      const response =
        await getMyProfile();

      const member =
        response.data;

      member.profilePhotoUrl =

        member.profilePhoto

          ? `${API_BASE_URL}${member.profilePhoto}`

          : null;

      setProfile(member);

    }

    catch (err) {

      console.error(err);

      setError(

        err.response?.data?.message ||

        "Unable to load profile."

      );

    }

    finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadProfile();

  }, []);

  return (

    <ProfileContext.Provider

      value={{

        profile,

        loading,

        error,

        reloadProfile:
          loadProfile,

      }}

    >

      {children}

    </ProfileContext.Provider>

  );

}

export function useProfile() {

  const context =
    useContext(ProfileContext);

  if (!context) {

    throw new Error(

      "useProfile must be used inside ProfileProvider"

    );

  }

  return context;

}