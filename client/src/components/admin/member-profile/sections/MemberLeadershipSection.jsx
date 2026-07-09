import {
  Crown,
  Building2,
  Briefcase,
  Calendar,
  CheckCircle,
  Pencil,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useAdmin } from "../../../../context/AdminContext";

function MemberLeadershipSection() {

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

            Leadership Information

          </h2>

          <p>

            Leadership experience and positions held by the member.

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

            <CheckCircle size={15} />

            Leadership Experience

          </label>

          <span>

            {

              selectedMember.leadershipExperience ||

              "No"

            }

          </span>

        </div>

        <div className="member-profile-field">

          <label>

            <Crown size={15} />

            Leadership Position

          </label>

          <span>

            {

              selectedMember.leadershipPosition ||

              "-"

            }

          </span>

        </div>

        <div className="member-profile-field">

          <label>

            <Building2 size={15} />

            Organization

          </label>

          <span>

            {

              selectedMember.leadershipOrganization ||

              "-"

            }

          </span>

        </div>

        <div className="member-profile-field">

          <label>

            <Calendar size={15} />

            Years Served

          </label>

          <span>

            {

              selectedMember.leadershipYears ||

              "-"

            }

          </span>

        </div>

        <div className="member-profile-field">

          <label>

            <Briefcase size={15} />

            Current Leadership Status

          </label>

          <span>

            {

              selectedMember.currentLeadershipStatus ||

              "-"

            }

          </span>

        </div>

        <div className="member-profile-field full-width">

          <label>

            <Briefcase size={15} />

            Leadership Description

          </label>

          <span>

            {

              selectedMember.leadershipDescription ||

              "-"

            }

          </span>

        </div>

      </div>

    </section>

  );

}

export default MemberLeadershipSection;