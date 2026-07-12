import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import {
  getMyProfile,
} from "../services/member.service";

/* ==========================================
   CONTEXT
========================================== */

const ProfileContext = createContext(null);

/* ==========================================
   PROVIDER
========================================== */

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

  const loadProfile = useCallback(async () => {

    try {

      setLoading(true);

      setError("");

      const response =
        await getMyProfile();

      setProfile(response.data);

    } catch (err) {

      console.error(err);

      setError(

        err.response?.data?.message ||

        "Unable to load profile."

      );

    } finally {

      setLoading(false);

    }

  }, []);

  /* ==========================================
     INITIAL LOAD
  ========================================== */

  useEffect(() => {

    loadProfile();

  }, [loadProfile]);

  /* ==========================================
     COMPUTED VALUES
  ========================================== */

  const fullName = profile
    ? [
        profile.firstName,
        profile.middleName,
        profile.lastName,
      ]
        .filter(Boolean)
        .join(" ")
    : "";

  const value = {

    profile,

    loading,

    error,

    reloadProfile: loadProfile,

    fullName,

    profilePhoto:
      profile?.profilePhoto || null,

    membershipStatus:
      profile?.membershipStatus || "",

  };

  return (

    <ProfileContext.Provider
      value={value}
    >

      {children}

    </ProfileContext.Provider>

  );

}

/* ==========================================
   HOOK
========================================== */

export function useProfile() {

  const context =
    useContext(ProfileContext);

  if (!context) {

    throw new Error(
      "useProfile must be used inside ProfileProvider."
    );

  }

  return context;

}