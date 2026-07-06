import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  verifyOTP,
  resendOTP,
} from "../../services/auth.service";

import "./OTPForm.css";

function OTPForm({ member }) {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);

  const [resending, setResending] = useState(false);

  const [countdown, setCountdown] = useState(60);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  /* ==========================================
     COUNTDOWN TIMER
  ========================================== */

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setTimeout(() => {
      setCountdown((previous) => previous - 1);
    }, 1000);

    return () => clearTimeout(timer);

  }, [countdown]);

  /* ==========================================
     VERIFY OTP
  ========================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!otp.trim()) {
      setError("Please enter the OTP.");
      return;
    }

    if (otp.length !== 6) {
      setError("OTP must contain exactly 6 digits.");
      return;
    }

    try {

      setLoading(true);

      const response = await verifyOTP({
        memberId: member.id,
        otp,
      });

      setSuccess(response.message);

      setTimeout(() => {

        navigate("/create-password", {
          state: {
            member,
          },
        });

      }, 1000);

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "OTP verification failed."
      );

    } finally {

      setLoading(false);

    }
  };

  /* ==========================================
     RESEND OTP
  ========================================== */

  const handleResendOTP = async () => {

    try {

      setResending(true);

      setError("");

      setSuccess("");

      if (member.email) {

        await resendOTP({
          email: member.email,
        });

      } else {

        await resendOTP({
          phone: member.phone,
        });

      }

      setSuccess("A new OTP has been sent.");

      setCountdown(60);

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Unable to resend OTP."
      );

    } finally {

      setResending(false);

    }
  };

  return (

    <div className="otp-form-container">

      <form
        className="otp-form"
        onSubmit={handleSubmit}
      >

        <div className="form-group">

          <label>
            Verification Code
          </label>

          <input
            type="text"
            maxLength={6}
            value={otp}
            placeholder="Enter OTP"
            onChange={(e) =>
              setOtp(
                e.target.value.replace(/\D/g, "")
              )
            }
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
          className="btn-primary"
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Verifying..."
            : "Verify OTP"}
        </button>

      </form>

      <div className="otp-help">

        {countdown > 0 ? (
          <p>

            Didn't receive your OTP?

            <br />

            You can request another one in

            <strong>
              {" "}
              {countdown}s
            </strong>

          </p>
        ) : (

          <button
            type="button"
            onClick={handleResendOTP}
            disabled={resending}
          >
            {resending
              ? "Sending..."
              : "Resend OTP"}
          </button>

        )}

      </div>

    </div>

  );
}

export default OTPForm;