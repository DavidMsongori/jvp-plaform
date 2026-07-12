import {
  FaSearch,
  FaSyncAlt,
} from "react-icons/fa";

import "./Members.css";

function MemberFilters({

  filters,

  setFilters,

}) {

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFilters((prev) => ({

      ...prev,

      page: 1,

      [name]: value,

    }));

  };

  const clearFilters = () => {

    setFilters({

      search: "",

      county: "",

      membershipStatus: "",

      membershipType: "",

      page: 1,

      limit: 10,

    });

  };

  return (

    <div className="member-filters">

      {/* Search */}

      <div className="search-box">

        <FaSearch />

        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleChange}
          placeholder="Search member..."
        />

      </div>

      {/* County */}

      <select
        name="county"
        value={filters.county}
        onChange={handleChange}
      >

        <option value="">
          All Counties
        </option>

        <option value="Mombasa">
          Mombasa
        </option>

        <option value="Kwale">
          Kwale
        </option>

        <option value="Kilifi">
          Kilifi
        </option>

        <option value="Tana River">
          Tana River
        </option>

        <option value="Lamu">
          Lamu
        </option>

        <option value="Taita Taveta">
          Taita Taveta
        </option>

      </select>

      {/* Status */}

      <select
        name="membershipStatus"
        value={filters.membershipStatus}
        onChange={handleChange}
      >

        <option value="">
          All Status
        </option>

        <option value="active">
          Active
        </option>

        <option value="pending_payment">
          Pending
        </option>

        <option value="expired">
          Expired
        </option>

        <option value="inactive">
          Inactive
        </option>

      </select>

      {/* Membership Type */}

      <select
        name="membershipType"
        value={filters.membershipType}
        onChange={handleChange}
      >

        <option value="">
          All Memberships
        </option>

        <option value="ordinary">
          Ordinary
        </option>

        <option value="leadership">
          Leadership
        </option>

      </select>

      {/* Refresh */}

      <button
        className="filter-btn"
        onClick={clearFilters}
      >

        <FaSyncAlt />

        <span>Reset</span>

      </button>

    </div>

  );

}

export default MemberFilters;