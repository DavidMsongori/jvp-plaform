import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";

import {
  verifyOTP,
  resendOTP,
} from "../../services/auth.service";

import "./OTPForm.css";

function VerifyOTP() {

  const navigate = useNavigate();

  const location = useLocation();

  const email = location.state?.email;

  const purpose =
    location.state?.purpose ||
    "ACCOUNT_ACTIVATION";

  /* ==========================================
     REDIRECT IF NO EMAIL
  ========================================== */

  if (!email) {

    return (
      <Navigate
        to="/register"
        replace
      />
    );

  }

  const [code, setCode] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [resending, setResending] =
    useState(false);

  const [countdown, setCountdown] =
    useState(60);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  /* ==========================================
     COUNTDOWN
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

    if (code.length !== 6) {

      setError(
        "Please enter the 6-digit verification code."
      );

      return;

    }

    try {

      setLoading(true);

      const response =
        await verifyOTP({

          email,

          code,

          purpose,

        });

      setSuccess(response.message);

      setTimeout(() => {

        navigate(
          "/create-password",
          {

            replace: true,

            state: {

              email,

            },

          }
        );

      }, 1000);

    } catch (err) {

      console.error(err);

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

  const handleResend = async () => {

    try {

      setResending(true);

      setError("");

      setSuccess("");

      await resendOTP({

        email,

        purpose,

      });

      setSuccess(
        "A new verification code has been sent."
      );

      setCountdown(60);

    } catch (err) {

      console.error(err);

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
            value={code}
            placeholder="Enter 6-digit code"
            onChange={(e) =>
              setCode(
                e.target.value.replace(
                  /\D/g,
                  ""
                )
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

          {

            loading

              ? "Verifying..."

              : "Verify OTP"

          }

        </button>

      </form>

      <div className="otp-help">

        {

          countdown > 0 ? (

            <p>

              Didn't receive the code?

              <br />

              Request another in

              <strong>

                {" "}

                {countdown}s

              </strong>

            </p>

          ) : (

            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
            >

              {

                resending

                  ? "Sending..."

                  : "Resend OTP"

              }

            </button>

          )

        }

      </div>

    </div>

  );

}

export default VerifyOTP;