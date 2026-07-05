import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";

import api from "../../services/api";

import "./ClaimForm.css";

function ClaimForm() {
  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!value.trim()) {
      alert("Please enter your email address or phone number.");
      return;
    }

    try {
      setLoading(true);

      const payload = {};

      if (value.includes("@")) {
        payload.email = value.trim().toLowerCase();
      } else {
        payload.phone = value.trim();
      }

      const response = await api.post("/auth/activate", payload);

      console.log("Activation Response:", response.data);

      alert(response.data.message);

      // Navigate to OTP page and pass member details
      navigate("/verify-otp", {
        state: {
          member: response.data.member,
        },
      });

      // Clear the form
      setValue("");

    } catch (error) {
      console.error("Activation Error:", error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert(
          "Unable to connect to the server. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="claim-header">
        <h2>Activate Existing Membership</h2>

        <p>
          If you were previously registered with JVP, enter the
          email address or phone number you used when registering.
        </p>
      </div>

      <form
        className="claim-form"
        onSubmit={handleSubmit}
      >
        <label>
          Email Address or Phone Number
        </label>

        <div className="claim-input">
          <FaEnvelope />

          <input
            type="text"
            placeholder="Enter your email or phone number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Checking Membership..." : "Continue"}
        </button>
      </form>
    </>
  );
}

export default ClaimForm;