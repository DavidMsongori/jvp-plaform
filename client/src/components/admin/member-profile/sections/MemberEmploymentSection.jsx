import {
  Briefcase,
  Building2,
  UserCheck,
  TrendingUp,
  Pencil,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useAdmin } from "../../../../context/AdminContext";

function MemberEmploymentSection() {

  const navigate = useNavigate();

  const {

    selectedMember,

  } = useAdmin();

  if (!selectedMember) {

    return null;

  }

  return (

    <section className="member-profile-section">

      {/* ==========================================
          SECTION HEADER
      ========================================== */}

      <div className="member-profile-section-header">

        <div>

          <h2>

            Employment Information

          </h2>

          <p>

            Employment status, occupation and professional experience.

          </p>

        </div>

        <button

          className="section-edit-btn"

          onClick={() =>

            navigate(

              `/admin/members/${selectedMember._id}/edit`

            )

          }

        >

          <Pencil size={16} />

          Edit

        </button>

      </div>

      {/* ==========================================
          CONTENT
      ========================================== */}

      <div className="member-profile-grid">

        <div className="member-profile-field">

          <label>

            <UserCheck size={15} />

            Employment Status

          </label>

          <span>

            {selectedMember.employmentStatus || "-"}

          </span>

        </div>

        <div className="member-profile-field">

          <label>

            <Briefcase size={15} />

            Occupation

          </label>

          <span>

            {selectedMember.occupation || "-"}

          </span>

        </div>

        <div className="member-profile-field">

          <label>

            <Building2 size={15} />

            Employer

          </label>

          <span>

            {selectedMember.employer || "-"}

          </span>

        </div>

        <div className="member-profile-field">

          <label>

            <Building2 size={15} />

            Business Name

          </label>

          <span>

            {selectedMember.businessName || "-"}

          </span>

        </div>

        <div className="member-profile-field">

          <label>

            <TrendingUp size={15} />

            Years of Experience

          </label>

          <span>

            {

              selectedMember.yearsExperience !== undefined &&

              selectedMember.yearsExperience !== null

                ? `${selectedMember.yearsExperience} Years`

                : "-"

            }

          </span>

        </div>

      </div>

    </section>

  );

}

export default MemberEmploymentSection;