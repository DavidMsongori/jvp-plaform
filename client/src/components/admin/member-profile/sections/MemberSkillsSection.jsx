import {
  Lightbulb,
  Heart,
  Languages,
  Clock,
  Pencil,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useAdmin } from "../../../../context/AdminContext";

function MemberSkillsSection() {

  const navigate = useNavigate();

  const {

    selectedMember,

  } = useAdmin();

  if (!selectedMember) {

    return null;

  }

  const renderTags = (items) => {

    if (!items || items.length === 0) {

      return (

        <span>

          -

        </span>

      );

    }

    return (

      <div className="member-tags">

        {

          items.map((item, index) => (

            <span

              key={index}

              className="member-tag"

            >

              {item}

            </span>

          ))

        }

      </div>

    );

  };

  return (

    <section className="member-profile-section">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="member-profile-section-header">

        <div>

          <h2>

            Skills & Interests

          </h2>

          <p>

            Professional skills, interests, languages and availability.

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

        <div className="member-profile-field full-width">

          <label>

            <Lightbulb size={15} />

            Skills

          </label>

          {

            renderTags(

              selectedMember.skills

            )

          }

        </div>

        <div className="member-profile-field full-width">

          <label>

            <Heart size={15} />

            Interests

          </label>

          {

            renderTags(

              selectedMember.interests

            )

          }

        </div>

        <div className="member-profile-field full-width">

          <label>

            <Languages size={15} />

            Languages

          </label>

          {

            renderTags(

              selectedMember.languages

            )

          }

        </div>

        <div className="member-profile-field">

          <label>

            <Clock size={15} />

            Availability

          </label>

          <span>

            {

              selectedMember.availability ||

              "-"

            }

          </span>

        </div>

        <div className="member-profile-field full-width">

          <label>

            <Lightbulb size={15} />

            Biography

          </label>

          <span>

            {

              selectedMember.bio ||

              "-"

            }

          </span>

        </div>

      </div>

    </section>

  );

}

export default MemberSkillsSection;