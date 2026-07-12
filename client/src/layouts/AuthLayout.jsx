import { Link } from "react-router-dom";

import "./AuthLayout.css";

function AuthLayout({

  title,

  subtitle,

  children,

}) {

  return (

    <div className="auth-layout">

      {/* ==========================================
          LEFT PANEL
      ========================================== */}

      <div className="auth-brand">

        <div className="brand-content">

          <img
            src="/logo.png"
            alt="JVP Connect"
            className="brand-logo"
          />

          <h1>

            JVP Connect

          </h1>

          <h2>

            Jumuiya ya Vijana wa Pwani

          </h2>

          <p>

            Connecting, empowering and transforming
            the youth of the Coastal Region through
            leadership, innovation, entrepreneurship
            and community service.

          </p>

          <div className="brand-features">

            <div>

              ✓ Secure Member Portal

            </div>

            <div>

              ✓ Membership Management

            </div>

            <div>

              ✓ Events & Programs

            </div>

            <div>

              ✓ Digital Membership Card

            </div>

          </div>

        </div>

      </div>

      {/* ==========================================
          RIGHT PANEL
      ========================================== */}

      <div className="auth-card-container">

        <div className="auth-card">

          <div className="auth-header">

            <h2>

              {title}

            </h2>

            {subtitle && (

              <p>

                {subtitle}

              </p>

            )}

          </div>

          <div className="auth-body">

            {children}

          </div>

          <div className="auth-footer">

            <p>

              © {new Date().getFullYear()} JVP Connect

            </p>

            <Link to="/">

              Return to Website

            </Link>

          </div>

        </div>

      </div>

    </div>

  );

}

export default AuthLayout;