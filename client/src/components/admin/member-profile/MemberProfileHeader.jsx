import {
  User,
  Pencil,
  Ban,
  CheckCircle,
  RefreshCw,
  Trash2,
  CreditCard,
  ShieldCheck,
  Calendar,
  MapPin,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useAdmin } from "../../../context/AdminContext";

import "./MemberProfileHeader.css";

function MemberProfileHeader() {

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

    <section className="member-profile-header">

      {/* ==========================================
          LEFT
      ========================================== */}

      <div className="member-profile-left">

        <div className="member-profile-avatar">

          {

            selectedMember.profilePhoto ? (

              <img

                src={selectedMember.profilePhoto}

                alt={fullName}

              />

            ) : (

              <User size={60} />

            )

          }

        </div>

        <div className="member-profile-info">

          <h1>

            {fullName}

          </h1>

          <p>

            {selectedMember.role

              ?.replace(/_/g, " ")

              .replace(

                /\b\w/g,

                c => c.toUpperCase()

              )}

          </p>

          <div className="member-profile-meta">

            <span>

              <CreditCard size={15} />

              {selectedMember.membershipNumber}

            </span>

            <span>

              <MapPin size={15} />

              {selectedMember.county}

            </span>

            <span>

              <Calendar size={15} />

              {

                selectedMember.memberSince

                  ? new Date(

                      selectedMember.memberSince

                    ).getFullYear()

                  : "-"

              }

            </span>

            <span>

              <ShieldCheck size={15} />

              {

                selectedMember.membershipStatus

              }

            </span>

          </div>

        </div>

      </div>

      {/* ==========================================
          RIGHT
      ========================================== */}

      <div className="member-profile-actions">

        <button

          className="primary"

          onClick={() =>

            navigate(

              `/admin/members/${selectedMember._id}/edit`

            )

          }

        >

          <Pencil size={18} />

          Edit

        </button>

        <button>

          <CheckCircle size={18} />

          Activate

        </button>

        <button>

          <Ban size={18} />

          Suspend

        </button>

        <button>

          <RefreshCw size={18} />

          Reset Password

        </button>

        <button className="danger">

          <Trash2 size={18} />

          Delete

        </button>

      </div>

    </section>

  );

}

export default MemberProfileHeader;