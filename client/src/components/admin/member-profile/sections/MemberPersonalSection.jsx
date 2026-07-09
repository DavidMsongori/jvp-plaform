import {
  User,
  Mail,
  Phone,
  CreditCard,
  Calendar,
  Users,
  Pencil,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useAdmin } from "../../../../context/AdminContext";

function MemberPersonalSection() {

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

            Personal Information

          </h2>

          <p>

            Basic member identity and contact information.

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

            <User size={15} />

            First Name

          </label>

          <span>

            {selectedMember.firstName || "-"}

          </span>

        </div>

        <div className="member-profile-field">

          <label>

            <User size={15} />

            Middle Name

          </label>

          <span>

            {selectedMember.middleName || "-"}

          </span>

        </div>

        <div className="member-profile-field">

          <label>

            <User size={15} />

            Last Name

          </label>

          <span>

            {selectedMember.lastName || "-"}

          </span>

        </div>

        <div className="member-profile-field">

          <label>

            <Users size={15} />

            Gender

          </label>

          <span>

            {selectedMember.gender || "-"}

          </span>

        </div>

        <div className="member-profile-field">

          <label>

            <Calendar size={15} />

            Date of Birth

          </label>

          <span>

            {

              selectedMember.dob

                ? new Date(

                    selectedMember.dob

                  ).toLocaleDateString()

                : "-"

            }

          </span>

        </div>

        <div className="member-profile-field">

          <label>

            <CreditCard size={15} />

            National ID

          </label>

          <span>

            {selectedMember.nationalId || "-"}

          </span>

        </div>

        <div className="member-profile-field">

          <label>

            <Phone size={15} />

            Phone Number

          </label>

          <span>

            {selectedMember.phone || "-"}

          </span>

        </div>

        <div className="member-profile-field">

          <label>

            <Mail size={15} />

            Email Address

          </label>

          <span>

            {selectedMember.email || "-"}

          </span>

        </div>

      </div>

    </section>

  );

}

export default MemberPersonalSection;