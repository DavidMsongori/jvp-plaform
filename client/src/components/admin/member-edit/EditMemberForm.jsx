import { useEffect, useState } from "react";

import { useAdmin } from "../../../context/AdminContext";

import {
  updateMember,
} from "../../../services/admin.service";

import PersonalSection from "./sections/PersonalSection";
import LocationSection from "./sections/LocationSection";
import EducationSection from "./sections/EducationSection";
import EmploymentSection from "./sections/EmploymentSection";
import LeadershipSection from "./sections/LeadershipSection";
import SkillsSection from "./sections/SkillsSection";
import SocialSection from "./sections/SocialSection";
import MembershipSection from "./sections/MembershipSection";
import SecuritySection from "./sections/SecuritySection";

import "./EditMemberForm.css";

function EditMemberForm() {

  const {

    selectedMember,

    reloadMember,

  } = useAdmin();

  const [formData, setFormData] = useState({});

  const [saving, setSaving] = useState(false);

  useEffect(() => {

    if (selectedMember) {

      setFormData({

        ...selectedMember,

      });

    }

  }, [selectedMember]);

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
     UPDATE ARRAY
  ========================================== */

  const updateArrayField = (

    field,

    values

  ) => {

    setFormData((previous) => ({

      ...previous,

      [field]: values,

    }));

  };

  /* ==========================================
     SAVE
  ========================================== */

  const handleSubmit = async (

    event

  ) => {

    event.preventDefault();

    try {

      setSaving(true);

      await updateMember(

        selectedMember._id,

        formData

      );

      await reloadMember();

    } catch (error) {

      console.error(error);

    } finally {

      setSaving(false);

    }

  };

  if (!selectedMember) {

    return null;

  }

  return (

    <form

      className="edit-member-form"

      onSubmit={handleSubmit}

    >

      <PersonalSection

        formData={formData}

        updateField={updateField}

      />

      <LocationSection

        formData={formData}

        updateField={updateField}

      />

      <EducationSection

        formData={formData}

        updateField={updateField}

      />

      <EmploymentSection

        formData={formData}

        updateField={updateField}

      />

      <LeadershipSection

        formData={formData}

        updateField={updateField}

      />

      <SkillsSection

        formData={formData}

        updateField={updateField}

        updateArrayField={

          updateArrayField

        }

      />

      <SocialSection

        formData={formData}

        updateField={updateField}

      />

      <MembershipSection

        formData={formData}

        updateField={updateField}

      />

      <SecuritySection

        formData={formData}

        updateField={updateField}

      />

      {/* ==========================================
          SAVE
      ========================================== */}

      <div className="edit-member-actions-footer">

        <button

          type="submit"

          className="save-member-btn"

          disabled={saving}

        >

          {

            saving

              ? "Saving Changes..."

              : "Save Member"

          }

        </button>

      </div>

    </form>

  );

}

export default EditMemberForm;