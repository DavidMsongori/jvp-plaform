import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { resetPassword } from "../../services/auth.service";

import "./ResetPasswordForm.css";

function ResetPasswordForm() {

  const navigate = useNavigate();

  const location = useLocation();

  const [form, setForm] = useState({

    email: location.state?.email || "",

    code: "",

    password: "",

    confirmPassword: "",

  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  /* ==========================================
     HANDLE CHANGE
  ========================================== */

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm((previous) => ({

      ...previous,

      [name]: value,

    }));

  };

  /* ==========================================
     SUBMIT
  ========================================== */

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    setSuccess("");

    if (!form.email.trim()) {

      return setError("Email is required.");

    }

    if (!form.code.trim()) {

      return setError("OTP is required.");

    }

    if (form.code.length !== 6) {

      return setError(
        "OTP must contain exactly 6 digits."
      );

    }

    if (!form.password) {

      return setError(
        "Please enter a password."
      );

    }

    if (form.password.length < 8) {

      return setError(
        "Password must be at least 8 characters."
      );

    }

    if (

      form.password !==

      form.confirmPassword

    ) {

      return setError(
        "Passwords do not match."
      );

    }

    try {

      setLoading(true);

      const response = await resetPassword({

        email: form.email,

        code: form.code,

        password: form.password,

        confirmPassword:
          form.confirmPassword,

      });

      setSuccess(response.message);

      setTimeout(() => {

        navigate("/login", {

          replace: true,

        });

      }, 1500);

    } catch (err) {

      console.error(err);

      setError(

        err.response?.data?.message ||

        "Unable to reset password."

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="reset-password-container">

      <form

        className="reset-password-form"

        onSubmit={handleSubmit}

      >

        <div className="form-group">

          <label>

            Email Address

          </label>

          <input

            type="email"

            name="email"

            value={form.email}

            onChange={handleChange}

            placeholder="Enter your email"

            autoComplete="email"

            required

          />

        </div>

        <div className="form-group">

          <label>

            Verification Code

          </label>

          <input

            type="text"

            name="code"

            value={form.code}

            onChange={(e) =>

              setForm((previous) => ({

                ...previous,

                code: e.target.value.replace(
                  /\D/g,
                  ""
                ),

              }))

            }

            maxLength={6}

            placeholder="Enter 6-digit OTP"

            required

          />

        </div>

        <div className="form-group">

          <label>

            New Password

          </label>

          <input

            type={
              showPassword
                ? "text"
                : "password"
            }

            name="password"

            value={form.password}

            onChange={handleChange}

            placeholder="Enter new password"

            autoComplete="new-password"

          />

        </div>

        <div className="checkbox-row">

          <label>

            <input

              type="checkbox"

              checked={showPassword}

              onChange={() =>

                setShowPassword(

                  !showPassword

                )

              }

            />

            Show Password

          </label>

        </div>

        <div className="form-group">

          <label>

            Confirm Password

          </label>

          <input

            type={
              showConfirmPassword
                ? "text"
                : "password"
            }

            name="confirmPassword"

            value={form.confirmPassword}

            onChange={handleChange}

            placeholder="Confirm password"

            autoComplete="new-password"

          />

        </div>

        <div className="checkbox-row">

          <label>

            <input

              type="checkbox"

              checked={
                showConfirmPassword
              }

              onChange={() =>

                setShowConfirmPassword(

                  !showConfirmPassword

                )

              }

            />

            Show Confirm Password

          </label>

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

            ? "Resetting Password..."

            : "Reset Password"}

        </button>

      </form>

    </div>

  );

}

export default ResetPasswordForm;