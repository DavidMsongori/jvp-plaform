import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaUserPlus } from "react-icons/fa";

import logo from "../../assets/images/jvp-logo.png";
import "./Navbar.css";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">

        {/* Logo */}

        <Link to="/" className="logo">

          <img src={logo} alt="JVP Logo" />

          <div className="logo-text">

            <h2>JVP Connect</h2>

            <p>Jumuiya ya Vijana wa Pwani</p>

          </div>

        </Link>

        {/* Navigation */}

        <nav className={menuOpen ? "nav-links active" : "nav-links"}>

          <Link to="/">Home</Link>

          <Link to="/about">About Us</Link>

          <Link to="/programs">Programs</Link>

          <Link to="/summit">Summit 2026</Link>

          <Link to="/events">Events</Link>

          <Link to="/news">News</Link>

          <Link to="/membership">Membership</Link>

          <Link to="/contact">Contact</Link>

        </nav>

        {/* Right Buttons */}

        <div className="nav-actions">

          <Link className="login-btn" to="/login">
            Login
          </Link>

          <Link className="join-btn" to="/register">
            Join JVP
            <FaUserPlus />
          </Link>

        </div>

        {/* Mobile */}

        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

      </div>
    </header>
  );
}

export default Navbar;