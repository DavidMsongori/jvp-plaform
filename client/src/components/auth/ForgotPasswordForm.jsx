import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { forgotPassword } from "../../services/auth.service";

import "./ForgotPasswordForm.css";

function ForgotPasswordForm() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  /* ==========================================
     SUBMIT
  ========================================== */

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");

    if (!email.trim()) {

      setError("Please enter your email address.");

      return;

    }

    try {

      setLoading(true);

      const response = await forgotPassword({

        email: email.trim().toLowerCase(),

      });

      setSuccess(response.message);

      setTimeout(() => {

        navigate("/reset-password", {

          replace: true,

          state: {

            email: response.data.email,

          },

        });

      }, 1200);

    } catch (err) {

      console.error(err);

      setError(

        err.response?.data?.message ||

        "Unable to process your request."

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="forgot-password-container">

      <form

        className="forgot-password-form"

        onSubmit={handleSubmit}

      >

        <div className="form-group">

          <label>

            Email Address

          </label>

          <input

            type="email"

            placeholder="Enter your email"

            value={email}

            onChange={(e) =>

              setEmail(e.target.value)

            }

            autoComplete="email"

            required

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

            ? "Sending OTP..."

            : "Send Verification Code"}

        </button>

      </form>

    </div>

  );

}

export default ForgotPasswordForm;