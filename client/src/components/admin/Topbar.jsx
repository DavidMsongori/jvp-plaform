import { useState, useEffect } from "react";
import {
  FaBars,
  FaBell,
  FaSearch,
  FaUserCircle,
  FaChevronDown,
} from "react-icons/fa";

import "./Topbar.css";

const Topbar = ({ onMenuClick }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="topbar">
      {/* Left */}

      <div className="topbar-left">
        <button
          className="menu-btn"
          onClick={onMenuClick}
        >
          <FaBars />
        </button>

        <div className="search-box">
          <FaSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search members, payments, events..."
          />
        </div>
      </div>

      {/* Right */}

      <div className="topbar-right">

        <div className="topbar-date">
          {currentTime.toLocaleDateString()}
          <br />
          <small>
            {currentTime.toLocaleTimeString()}
          </small>
        </div>

        <button className="notification-btn">
          <FaBell />

          <span className="notification-count">
            0
          </span>
        </button>

        <div
          className="profile-menu"
          onClick={() =>
            setDropdownOpen(!dropdownOpen)
          }
        >
          <FaUserCircle className="profile-icon" />

          <div className="profile-info">
            <strong>Administrator</strong>

            <small>Super Admin</small>
          </div>

          <FaChevronDown />

          {dropdownOpen && (
            <div className="profile-dropdown">
              <button>
                My Profile
              </button>

              <button>
                Settings
              </button>

              <button>
                Logout
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Topbar;