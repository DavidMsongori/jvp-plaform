import { useEffect, useState } from "react";
import { Save } from "lucide-react";

import { useDashboard } from "../../context/DashboardContext";
// import { updateProfile } from "../../services/member.service";

import PersonalSection from "./sections/PersonalSection";
import LocationSection from "./sections/LocationSection";
import EducationSection from "./sections/EducationSection";
import EmploymentSection from "./sections/EmploymentSection";
import LeadershipSection from "./sections/LeadershipSection";
import SkillsSection from "./sections/SkillsSection";
import SocialSection from "./sections/SocialSection";

import "./ProfileForm.css";

function ProfileForm() {

  const {

    dashboard,

    loading,

    error,

  } = useDashboard();

  const [saving, setSaving] = useState(false);

  /* =====================================================
     FORM DATA
  ===================================================== */

  const [formData, setFormData] = useState({

    /* ==========================
       PERSONAL
    ========================== */

    firstName: "",

    middleName: "",

    lastName: "",

    gender: "",

    dateOfBirth: "",

    phone: "",

    email: "",

    /* ==========================
       LOCATION
    ========================== */

    county: "",

    constituency: "",

    ward: "",

    village: "",

    /* ==========================
       EDUCATION
    ========================== */

    education: {

      level: "",

      institution: "",

      course: "",

      registrationNumber: "",

      graduationYear: "",

      status: "",

    },

    /* ==========================
       EMPLOYMENT
    ========================== */

    employment: {

      status: "",

      occupation: "",

      employer: "",

      businessName: "",

      industry: "",

      experienceYears: "",

    },

    /* ==========================
       LEADERSHIP
    ========================== */

    leadership: {

      hasExperience: false,

      organization: "",

      position: "",

      startYear: "",

      endYear: "",

      achievements: "",

    },

    /* ==========================
       PROFILE
    ========================== */

    skills: [],

    languages: [],

    interests: [],

    bio: "",

    /* ==========================
       SOCIAL
    ========================== */

    social: {

      facebook: "",

      instagram: "",

      linkedin: "",

      twitter: "",

      tiktok: "",

    },

  });

  /* =====================================================
     LOAD MEMBER
  ===================================================== */

  useEffect(() => {

    if (!dashboard?.member) return;

    const member = dashboard.member;

    setFormData({

      firstName: member.firstName || "",

      middleName: member.middleName || "",

      lastName: member.lastName || "",

      gender: member.gender || "",

      dateOfBirth: member.dateOfBirth
        ? member.dateOfBirth.substring(0, 10)
        : "",

      phone: member.phone || "",

      email: member.email || "",

      county: member.county || "",

      constituency: member.constituency || "",

      ward: member.ward || "",

      village: member.village || "",

      education: {

        level:
          member.education?.level || "",

        institution:
          member.education?.institution || "",

        course:
          member.education?.course || "",

        registrationNumber:
          member.education?.registrationNumber || "",

        graduationYear:
          member.education?.graduationYear || "",

        status:
          member.education?.status || "",

      },

      employment: {

        status:
          member.employment?.status || "",

        occupation:
          member.employment?.occupation || "",

        employer:
          member.employment?.employer || "",

        businessName:
          member.employment?.businessName || "",

        industry:
          member.employment?.industry || "",

        experienceYears:
          member.employment?.experienceYears || "",

      },

      leadership: {

        hasExperience:
          member.leadership?.hasExperience || false,

        organization:
          member.leadership?.organization || "",

        position:
          member.leadership?.position || "",

        startYear:
          member.leadership?.startYear || "",

        endYear:
          member.leadership?.endYear || "",

        achievements:
          member.leadership?.achievements || "",

      },

      skills: member.skills || [],

      languages: member.languages || [],

      interests: member.interests || [],

      bio: member.bio || "",

      social: {

        facebook:
          member.social?.facebook || "",

        instagram:
          member.social?.instagram || "",

        linkedin:
          member.social?.linkedin || "",

        twitter:
          member.social?.twitter || "",

        tiktok:
          member.social?.tiktok || "",

      },

    });

  }, [dashboard]);

  /* =====================================================
     HANDLE CHANGE
  ===================================================== */

  const handleChange = (e) => {

    const {

      name,

      value,

    } = e.target;

    /* ==========================
       NESTED OBJECTS
    ========================== */

    if (name.includes(".")) {

      const [

        parent,

        child,

      ] = name.split(".");

      setFormData((prev) => ({

        ...prev,

        [parent]: {

          ...prev[parent],

          [child]: value,

        },

      }));

      return;

    }

    /* ==========================
       ARRAYS
    ========================== */

    if (

      name === "skills" ||

      name === "languages" ||

      name === "interests"

    ) {

      setFormData((prev) => ({

        ...prev,

        [name]: value

          .split(",")

          .map((item) => item.trim())

          .filter(Boolean),

      }));

      return;

    }

    /* ==========================
       NORMAL FIELD
    ========================== */

    setFormData((prev) => ({

      ...prev,

      [name]: value,

    }));

  };

  /* =====================================================
     SAVE PROFILE
  ===================================================== */

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setSaving(true);

      console.log(formData);

      /*
      await updateProfile(formData);
      */

    } catch (error) {

      console.error(error);

    } finally {

      setSaving(false);

    }

  };

    /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {

    return (

      <div className="dashboard-card">

        Loading profile...

      </div>

    );

  }

  /* =====================================================
     ERROR
  ===================================================== */

  if (error) {

    return (

      <div className="dashboard-card">

        <h3>

          Unable to load profile

        </h3>

        <p>

          {error}

        </p>

      </div>

    );

  }

  /* =====================================================
     PAGE
  ===================================================== */

  return (

    <form

      className="profile-form dashboard-card"

      onSubmit={handleSubmit}

    >

      <PersonalSection

        formData={formData}

        handleChange={handleChange}

      />

      <LocationSection

        formData={formData}

        handleChange={handleChange}

      />

      <EducationSection

        formData={formData}

        handleChange={handleChange}

      />

      <EmploymentSection

        formData={formData}

        handleChange={handleChange}

      />

      <LeadershipSection

        formData={formData}

        handleChange={handleChange}

      />

      <SkillsSection

        formData={formData}

        handleChange={handleChange}

      />

      <SocialSection

        formData={formData}

        handleChange={handleChange}

      />

      {/* ==========================================
          SAVE ACTIONS
      ========================================== */}

      <div className="profile-actions">

        <button

          type="submit"

          disabled={saving}

          className="dashboard-btn dashboard-btn-primary"

        >

          <Save size={18} />

          {

            saving

              ? "Saving Changes..."

              : "Save Changes"

          }

        </button>

      </div>

    </form>

  );

}

export default ProfileForm;