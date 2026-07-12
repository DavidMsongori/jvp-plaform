import "./Footer.css";

import {
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="summit-footer">

      <div className="footer-container">

        {/* ================= BRANDING ================= */}

        <div className="footer-column branding">

          <div className="footer-logos">

            <img
              src="/images/branding/jvp-logo.png"
              alt="JVP"
              className="footer-logo"
            />

            <div className="footer-divider"></div>

            <img
              src="/images/branding/summit-logo.png"
              alt="Coastal Youth Summit"
              className="footer-logo summit-logo"
            />

          </div>

          <p>
            The Coastal Youth Summit is the flagship annual gathering
            organized by <strong>Jumuiya ya Vijana wa Pwani (JVP)</strong>,
            bringing together youth leaders, entrepreneurs, innovators,
            policymakers and development partners to shape the future of
            Kenya's Coast Region.
          </p>

          <div className="footer-socials">

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn />
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </a>

          </div>

        </div>

        {/* ================= QUICK LINKS ================= */}

        <div className="footer-column">

          <h3>Quick Links</h3>

          <a href="#about">About</a>
          <a href="#tracks">Tracks</a>
          <a href="#programme">Programme</a>
          <a href="#speakers">Speakers</a>
          <a href="#venue">Venue</a>
          <a href="#faq">FAQs</a>

        </div>

        {/* ================= CONTACT ================= */}

        <div className="footer-column">

          <h3>Contact Us</h3>

          <div className="contact-item">

            <MapPin size={18} />

            <span>
              Malindi, Kilifi County, Kenya
            </span>

          </div>

          <div className="contact-item">

            <Phone size={18} />

            <span>
              +254 740 504 969
            </span>

          </div>

          <div className="contact-item">

            <Mail size={18} />

            <span>
              summit@jumuiyapwani.org
            </span>

          </div>

        </div>

        {/* ================= NEWSLETTER ================= */}

        <div className="footer-column">

          <h3>Stay Updated</h3>

          <p>
            Subscribe to receive the latest summit news,
            speaker announcements and programme updates.
          </p>

          <form className="newsletter">

            <input
              type="email"
              placeholder="Enter your email"
            />

            <button type="submit">
              Subscribe
            </button>

          </form>

        </div>

      </div>

      {/* ================= BOTTOM ================= */}

      <div className="footer-bottom">

        <p>
          © 2026 Coastal Youth Summit. All Rights Reserved.
        </p>

        <p>
          Organized by <strong>Jumuiya ya Vijana wa Pwani (JVP)</strong>
        </p>

      </div>

    </footer>
  );
}