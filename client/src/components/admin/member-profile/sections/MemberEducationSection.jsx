import {
  GraduationCap,
  School,
  BookOpen,
  Calendar,
  BadgeCheck,
  Pencil,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useAdmin } from "../../../../context/AdminContext";

function MemberEducationSection() {

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

            Education

          </h2>

          <p>

            Academic qualifications and learning information.

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

            <School size={15} />

            Institution

          </label>

          <span>

            {selectedMember.institution || "-"}

          </span>

        </div>

        <div className="member-profile-field">

          <label>

            <BookOpen size={15} />

            Course

          </label>

          <span>

            {selectedMember.course || "-"}

          </span>

        </div>

        <div className="member-profile-field">

          <label>

            <GraduationCap size={15} />

            Education Level

          </label>

          <span>

            {selectedMember.level || "-"}

          </span>

        </div>

        <div className="member-profile-field">

          <label>

            <Calendar size={15} />

            Graduation Year

          </label>

          <span>

            {selectedMember.graduationYear || "-"}

          </span>

        </div>

        <div className="member-profile-field full-width">

          <label>

            <BadgeCheck size={15} />

            Student Registration Number

          </label>

          <span>

            {

              selectedMember.studentRegistrationNumber ||

              "-"

            }

          </span>

        </div>

      </div>

    </section>

  );

}

export default MemberEducationSection;