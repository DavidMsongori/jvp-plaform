import PageLayout from "../common/PageLayout";
import PageHero from "../common/PageHero";
import PageSection from "../common/PageSection";

import jvpLogo from "../../assets/images/jvp-logo.png";

import "./AuthLayout.css";

function AuthLayout({
  title,
  subtitle,
  sectionTitle,
  sectionSubtitle,
  children,
}) {
  return (
    <PageLayout>
      <PageHero
        title={title}
        subtitle={subtitle}
      />

      <PageSection
        title={sectionTitle}
        subtitle={sectionSubtitle}
      >
        <div className="auth-layout">

          <div className="auth-card">

            {/* ==========================================
                BRANDING
            ========================================== */}

            <div className="auth-brand">

              <img
                src={jvpLogo}
                alt="JVP Logo"
                className="auth-logo"
              />

              <span className="portal-badge">
                JVP CONNECT
              </span>

              <h2>
                Coast Region Digital Membership Portal
              </h2>

              <p className="portal-tagline">
                Empowering Coastal Youth Through Unity,
                Leadership & Opportunity
              </p>

            </div>

            {/* ==========================================
                FORM CONTENT
            ========================================== */}

            <div className="auth-content">
              {children}
            </div>

            {/* ==========================================
                FOOTER
            ========================================== */}

            <div className="auth-footer">

              <p>
                Jumuiya ya Vijana wa Pwani
              </p>

              <small>
                Secure • Trusted • Digital Platform
              </small>

            </div>

          </div>

        </div>
      </PageSection>
    </PageLayout>
  );
}

export default AuthLayout;