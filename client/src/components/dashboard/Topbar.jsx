import {
  Bell,
  Search,
} from "lucide-react";

import {
  useProfile,
} from "../../context/ProfileContext";

import {
  useDashboardUI,
} from "../../context/DashboardUIContext";

import "./Topbar.css";

const Topbar = () => {

  const {

    profile,

    fullName,

    profilePhoto,

  } = useProfile();

  const {

    search,

    setSearch,

  } = useDashboardUI();

  return (

    <header className="member-topbar">

      {/* ======================================
          LEFT
      ====================================== */}

      <div>

        <h2>

          Welcome back,

          {" "}

          {profile?.firstName || "Member"}

        </h2>

        <small>

          JVP Connect Member Portal

        </small>

      </div>

      {/* ======================================
          RIGHT
      ====================================== */}

      <div className="topbar-right">

        {/* SEARCH */}

        <div className="search-box">

          <Search size={18} />

          <input

            type="text"

            placeholder="Search..."

            value={search}

            onChange={(event) =>

              setSearch(event.target.value)

            }

          />

        </div>

        {/* NOTIFICATIONS */}

        <button

          className="notification-btn"

          type="button"

        >

          <Bell size={20} />

        </button>

        {/* PROFILE */}

        <div className="profile-chip">

          <img

            src={

              profilePhoto ||

              "/images/default-avatar.png"

            }

            alt={

              fullName ||

              "Member"

            }

            onError={(event) => {

              event.target.src =

                "/images/default-avatar.png";

            }}

          />

          <span>

            {fullName || "Member"}

          </span>

        </div>

      </div>

    </header>

  );

};

export default Topbar;