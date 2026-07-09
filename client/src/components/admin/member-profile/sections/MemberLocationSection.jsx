import {
  MapPin,
  Building2,
  Landmark,
  Home,
  Pencil,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useAdmin } from "../../../../context/AdminContext";

function MemberLocationSection() {

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

            Location Information

          </h2>

          <p>

            County, constituency, ward and residence details.

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

            <MapPin size={15} />

            County

          </label>

          <span>

            {selectedMember.county || "-"}

          </span>

        </div>

        <div className="member-profile-field">

          <label>

            <Building2 size={15} />

            Constituency

          </label>

          <span>

            {selectedMember.constituency || "-"}

          </span>

        </div>

        <div className="member-profile-field">

          <label>

            <Landmark size={15} />

            Ward

          </label>

          <span>

            {selectedMember.ward || "-"}

          </span>

        </div>

        <div className="member-profile-field">

          <label>

            <Home size={15} />

            Village / Estate

          </label>

          <span>

            {selectedMember.village || "-"}

          </span>

        </div>

        <div className="member-profile-field full-width">

          <label>

            <MapPin size={15} />

            Physical Address

          </label>

          <span>

            {selectedMember.address || "-"}

          </span>

        </div>

      </div>

    </section>

  );

}

export default MemberLocationSection;