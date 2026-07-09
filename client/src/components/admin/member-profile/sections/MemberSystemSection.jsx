import {
  Database,
  Shield,
  Clock,
  Calendar,
  Key,
  RefreshCw,
  CheckCircle,
  Pencil,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useAdmin } from "../../../../context/AdminContext";

function MemberSystemSection() {

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
          HEADER
      ========================================== */}

      <div className="member-profile-section-header">

        <div>

          <h2>

            System Information

          </h2>

          <p>

            Internal account information used by the JVP Connect system.

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

            <Database size={15} />

            Member ID

          </label>

          <span>

            {selectedMember._id}

          </span>

        </div>

        <div className="member-profile-field">

          <label>

            <Shield size={15} />

            Account Role

          </label>

          <span>

            {

              selectedMember.role

                ?.replace(/_/g, " ")

                .replace(

                  /\b\w/g,

                  c => c.toUpperCase()

                ) ||

              "-"

            }

          </span>

        </div>

        <div className="member-profile-field">

          <label>

            <CheckCircle size={15} />

            Legacy Member

          </label>

          <span>

            {

              selectedMember.legacyMember

                ? "Yes"

                : "No"

            }

          </span>

        </div>

        <div className="member-profile-field">

          <label>

            <RefreshCw size={15} />

            Migration Completed

          </label>

          <span>

            {

              selectedMember.migrationCompleted

                ? "Yes"

                : "No"

            }

          </span>

        </div>

        <div className="member-profile-field">

          <label>

            <Clock size={15} />

            Last Login

          </label>

          <span>

            {

              selectedMember.lastLogin

                ? new Date(

                    selectedMember.lastLogin

                  ).toLocaleString()

                : "Never"

            }

          </span>

        </div>

        <div className="member-profile-field">

          <label>

            <Key size={15} />

            Password Set

          </label>

          <span>

            {

              selectedMember.password

                ? "Yes"

                : "No"

            }

          </span>

        </div>

        <div className="member-profile-field">

          <label>

            <Calendar size={15} />

            Created At

          </label>

          <span>

            {

              selectedMember.createdAt

                ? new Date(

                    selectedMember.createdAt

                  ).toLocaleString()

                : "-"

            }

          </span>

        </div>

        <div className="member-profile-field">

          <label>

            <Calendar size={15} />

            Updated At

          </label>

          <span>

            {

              selectedMember.updatedAt

                ? new Date(

                    selectedMember.updatedAt

                  ).toLocaleString()

                : "-"

            }

          </span>

        </div>

      </div>

    </section>

  );

}

export default MemberSystemSection;