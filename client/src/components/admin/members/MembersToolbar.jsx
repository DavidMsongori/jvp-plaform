import {
  Search,
  Filter,
  Download,
  UserPlus,
  RotateCcw,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAdminUI } from "../../../context/AdminUIContext";

import "./MembersToolbar.css";

function MembersToolbar() {

  const navigate = useNavigate();

  const {

    search,
    setSearch,

  } = useAdminUI();

  const [

    county,

    setCounty,

  ] = useState("");

  const [

    status,

    setStatus,

  ] = useState("");

  const [

    role,

    setRole,

  ] = useState("");

  const clearFilters = () => {

    setSearch("");

    setCounty("");

    setStatus("");

    setRole("");

  };

  return (

    <section className="members-toolbar">

      {/* ==========================================
          SEARCH
      ========================================== */}

      <div className="toolbar-search">

        <Search size={18} />

        <input

          type="text"

          placeholder="Search members..."

          value={search}

          onChange={(e) =>

            setSearch(e.target.value)

          }

        />

      </div>

      {/* ==========================================
          FILTERS
      ========================================== */}

      <div className="toolbar-filters">

        <select

          value={county}

          onChange={(e) =>

            setCounty(e.target.value)

          }

        >

          <option value="">

            All Counties

          </option>

          <option>Mombasa</option>

          <option>Kwale</option>

          <option>Kilifi</option>

          <option>Tana River</option>

          <option>Lamu</option>

          <option>Taita Taveta</option>

        </select>

        <select

          value={status}

          onChange={(e) =>

            setStatus(e.target.value)

          }

        >

          <option value="">

            Membership Status

          </option>

          <option>Active</option>

          <option>Pending</option>

          <option>Suspended</option>

          <option>Expired</option>

        </select>

        <select

          value={role}

          onChange={(e) =>

            setRole(e.target.value)

          }

        >

          <option value="">

            All Roles

          </option>

          <option>Member</option>

          <option>Ward Leader</option>

          <option>Constituency Leader</option>

          <option>County Leader</option>

          <option>Regional Leader</option>

          <option>Secretariat</option>

          <option>Admin</option>

          <option>Super Admin</option>

        </select>

      </div>

      {/* ==========================================
          ACTIONS
      ========================================== */}

      <div className="toolbar-actions">

        <button

          className="toolbar-btn secondary"

          onClick={clearFilters}

        >

          <RotateCcw size={18} />

          <span>

            Reset

          </span>

        </button>

        <button

          className="toolbar-btn secondary"

        >

          <Filter size={18} />

          <span>

            Filters

          </span>

        </button>

        <button

          className="toolbar-btn secondary"

        >

          <Download size={18} />

          <span>

            Export

          </span>

        </button>

        <button

          className="toolbar-btn primary"

          onClick={() =>

            navigate("/admin/members/new")

          }

        >

          <UserPlus size={18} />

          <span>

            Add Member

          </span>

        </button>

      </div>

    </section>

  );

}

export default MembersToolbar;