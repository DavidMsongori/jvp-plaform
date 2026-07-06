import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { activateMembership } from "../../services/auth.service";

import "./ClaimForm.css";

function ClaimForm() {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!identifier.trim()) {
      setError("Please enter your phone number or email address.");
      return;
    }

    let payload = {};

    if (identifier.includes("@")) {
      payload.email = identifier.trim().toLowerCase();
    } else {
      payload.phone = identifier.trim();
    }

    try {
      setLoading(true);

      const response = await activateMembership(payload);

      setSuccess(response.message);

      setTimeout(() => {
        navigate("/verify-otp", {
          state: {
            member: response.data.member,
          },
        });
      }, 1000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to activate membership."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="claim-form-container">
      <form className="claim-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Phone Number or Email Address
          </label>

          <input
            type="text"
            placeholder="0794151842 or member@email.com"
            value={identifier}
            onChange={(e) =>
              setIdentifier(e.target.value)
            }
            autoComplete="off"
          />
        </div>

        {error && (
          <div className="form-error">
            {error}
          </div>
        )}

        {success && (
          <div className="form-success">
            {success}
          </div>
        )}

        <button
          type="submit"
          className="btn-primary"
          disabled={loading}
        >
          {loading
            ? "Searching Member..."
            : "Activate Membership"}
        </button>
      </form>

      <div className="claim-footer">
        Already activated?

        <button
          type="button"
          className="link-button"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default ClaimForm;