import { Link } from "react-router-dom";
import { FaArrowLeft, FaUser } from "react-icons/fa";

function MemberDetails() {
  return (
    <div
      style={{
        padding: "2rem",
      }}
    >
      <Link
        to="/admin/members"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "2rem",
          color: "#2563eb",
          textDecoration: "none",
          fontWeight: 600,
        }}
      >
        <FaArrowLeft />
        Back to Members
      </Link>

      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          padding: "4rem 2rem",
          textAlign: "center",
          boxShadow: "0 10px 25px rgba(0,0,0,.08)",
        }}
      >
        <div
          style={{
            width: "90px",
            height: "90px",
            margin: "0 auto 1.5rem",
            borderRadius: "50%",
            background: "#eff6ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2rem",
            color: "#2563eb",
          }}
        >
          <FaUser />
        </div>

        <h2
          style={{
            marginBottom: "1rem",
            color: "#1e293b",
          }}
        >
          Member Details
        </h2>

        <p
          style={{
            color: "#64748b",
            maxWidth: "550px",
            margin: "0 auto",
            lineHeight: 1.8,
          }}
        >
          This page is currently being rebuilt using the new
          JVP Connect Admin architecture.
          <br />
          It will include complete member information,
          profile photo, payment history, membership history,
          activity logs, documents, edit functionality,
          activation/deactivation, and role management.
        </p>

        <div
          style={{
            marginTop: "2rem",
          }}
        >
          <span
            style={{
              background: "#fef3c7",
              color: "#92400e",
              padding: ".7rem 1.2rem",
              borderRadius: "999px",
              fontWeight: 600,
            }}
          >
            🚧 Under Development
          </span>
        </div>
      </div>
    </div>
  );
}

export default MemberDetails;