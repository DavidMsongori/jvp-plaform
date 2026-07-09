import {
  useEffect,
  useState,
} from "react";

import {
  Save,
  LoaderCircle,
} from "lucide-react";

import {
  updateMyProfile,
} from "../../services/member.service";

import {
  useProfile,
} from "../../context/ProfileContext";

/* ==========================================
   FORM SECTIONS
========================================== */

import PersonalInformation from "./PersonalInformation";
import LocationInformation from "./LocationInformation";
import EducationInformation from "./EducationInformation";
import EmploymentInformation from "./EmploymentInformation";
import LeadershipInformation from "./LeadershipInformation";
import SkillsInformation from "./SkillsInformation";
import SocialInformation from "./SocialInformation";

import "./Profile.css";

/* =====================================================
   PROFILE FORM
===================================================== */

function ProfileForm() {

  const {

    profile,

    reloadProfile,

  } = useProfile();

  const [formData, setFormData] =
    useState({});

  const [saving, setSaving] =
    useState(false);

  /* ==========================================
     LOAD PROFILE
  ========================================== */

  useEffect(() => {

    if (profile) {

      setFormData({

        ...profile,

      });

    }

  }, [profile]);

  /* ==========================================
     UPDATE FIELD
  ========================================== */

  const updateField = (

    name,

    value

  ) => {

    setFormData((previous) => ({

      ...previous,

      [name]: value,

    }));

  };

  /* ==========================================
     UPDATE NESTED OBJECT
  ========================================== */

  const updateNestedField = (

    section,

    name,

    value

  ) => {

    setFormData((previous) => ({

      ...previous,

      [section]: {

        ...previous[section],

        [name]: value,

      },

    }));

  };

  /* ==========================================
     SAVE PROFILE
  ========================================== */

  const handleSubmit = async (

    event

  ) => {

    event.preventDefault();

    try {

      setSaving(true);

      await updateMyProfile(

        formData

      );

      await reloadProfile();

      alert(

        "Profile updated successfully."

      );

    }

    catch (error) {

      console.error(error);

      alert(

        error.response?.data?.message ||

        "Unable to update profile."

      );

    }

    finally {

      setSaving(false);

    }

  };

  return (

    <form

      className="profile-form"

      onSubmit={handleSubmit}

    >

      {/* ======================================
          PERSONAL
      ====================================== */}

      <PersonalInformation

        formData={formData}

        updateField={updateField}

      />

      {/* ======================================
          LOCATION
      ====================================== */}

      <LocationInformation

        formData={formData}

        updateNestedField={

          updateNestedField

        }

      />

      {/* ======================================
          EDUCATION
      ====================================== */}

      <EducationInformation

        formData={formData}

        updateNestedField={

          updateNestedField

        }

      />

      {/* ======================================
          EMPLOYMENT
      ====================================== */}

      <EmploymentInformation

        formData={formData}

        updateNestedField={

          updateNestedField

        }

      />

      {/* ======================================
          LEADERSHIP
      ====================================== */}

      <LeadershipInformation

        formData={formData}

        updateNestedField={

          updateNestedField

        }

      />

      {/* ======================================
          SKILLS
      ====================================== */}

      <SkillsInformation

        formData={formData}

        updateField={updateField}

      />

      {/* ======================================
          SOCIAL
      ====================================== */}

      <SocialInformation

        formData={formData}

        updateNestedField={

          updateNestedField

        }

      />

      {/* ======================================
          ACTIONS
      ====================================== */}

      <div className="profile-actions">

        <button

          type="submit"

          className="profile-save-btn"

          disabled={saving}

        >

          {

            saving ? (

              <>

                <LoaderCircle

                  size={18}

                  className="spin"

                />

                Saving...

              </>

            ) : (

              <>

                <Save size={18} />

                Save Profile

              </>

            )

          }

        </button>

      </div>

    </form>

  );

}

export default ProfileForm;