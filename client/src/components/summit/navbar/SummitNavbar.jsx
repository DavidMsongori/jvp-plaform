import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import "./SummitNavbar.css";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Tracks", href: "#tracks" },
  { label: "Programme", href: "#programme" },
  { label: "Partners", href: "#partners" },
  { label: "Gallery", href: "#gallery" },
  { label: "Venue", href: "#venue" },
  { label: "FAQ", href: "#faq" },
];

export default function SummitNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = document.querySelectorAll("section[id]");

      let currentSection = "hero";

      sections.forEach((section) => {
        const top = section.offsetTop - 120;
        const height = section.offsetHeight;

        if (
          window.scrollY >= top &&
          window.scrollY < top + height
        ) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <header className={`summit-navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">

        {/* ================= LOGOS ================= */}

        <a
          href="#hero"
          className="navbar-brand"
          onClick={closeMobileMenu}
        >
          <img
            src="/images/branding/jvp-logo.png"
            alt="JVP Logo"
            className="jvp-logo"
          />

          <span className="logo-divider"></span>

          <img
            src="/images/branding/summit-logo.png"
            alt="Coastal Youth Summit"
            className="summit-logo"
          />
        </a>

        {/* ================= DESKTOP MENU ================= */}

        <nav className="navbar-menu">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={
                activeSection === item.href.substring(1)
                  ? "active"
                  : ""
              }
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* ================= CTA ================= */}

        <div className="navbar-actions">
          <a
            href="#register"
            className="register-btn"
          >
            Register Now
          </a>
        </div>

        {/* ================= MOBILE BUTTON ================= */}

        <button
          className="mobile-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle Navigation"
        >
          {mobileOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

      </div>

      {/* ================= MOBILE MENU ================= */}

      <div
        className={`mobile-menu ${
          mobileOpen ? "active" : ""
        }`}
      >
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={
              activeSection === item.href.substring(1)
                ? "active"
                : ""
            }
            onClick={closeMobileMenu}
          >
            {item.label}
          </a>
        ))}

        <a
          href="#register"
          className="register-btn"
          onClick={closeMobileMenu}
        >
          Register Now
        </a>
      </div>
    </header>
  );
}