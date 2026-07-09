import {
  ArrowLeft,
  Save,
  User,
  Shield,
  CreditCard,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useAdmin } from "../../../context/AdminContext";

import "./EditMemberHeader.css";

function EditMemberHeader({

  onSave,

  saving = false,

}) {

  const navigate = useNavigate();

  const {

    selectedMember,

  } = useAdmin();

  if (!selectedMember) {

    return null;

  }

  const fullName = [

    selectedMember.firstName,

    selectedMember.middleName,

    selectedMember.lastName,

  ]

    .filter(Boolean)

    .join(" ");

  return (

    <section className="edit-member-header">

      {/* ==========================================
          LEFT
      ========================================== */}

      <div className="edit-member-info">

        <button

          className="back-button"

          onClick={() => navigate(-1)}

        >

          <ArrowLeft size={18} />

        </button>

        <div className="edit-member-avatar">

          {

            selectedMember.profilePhoto ? (

              <img

                src={selectedMember.profilePhoto}

                alt={fullName}

              />

            ) : (

              <User size={42} />

            )

          }

        </div>

        <div className="edit-member-details">

          <span>

            Edit Member

          </span>

          <h1>

            {fullName}

          </h1>

          <div className="edit-member-meta">

            <div>

              <CreditCard size={15} />

              {

                selectedMember.membershipNumber ||

                "No Membership No."

              }

            </div>

            <div>

              <Shield size={15} />

              {

                selectedMember.role

                  ?.replace(/_/g, " ")

                  .replace(

                    /\b\w/g,

                    c => c.toUpperCase()

                  )

              }

            </div>

          </div>

        </div>

      </div>

      {/* ==========================================
          ACTIONS
      ========================================== */}

      <div className="edit-member-actions">

        <button

          className="secondary-btn"

          onClick={() =>

            navigate(

              `/admin/members/${selectedMember._id}`

            )

          }

        >

          Cancel

        </button>

        <button

          className="primary-btn"

          onClick={onSave}

          disabled={saving}

        >

          <Save size={18} />

          {

            saving

              ? "Saving..."

              : "Save Changes"

          }

        </button>

      </div>

    </section>

  );

}

export default EditMemberHeader;