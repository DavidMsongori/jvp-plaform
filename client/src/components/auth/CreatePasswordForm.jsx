import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createPassword } from "../../services/auth.service";

import "./CreatePasswordForm.css";

function CreatePasswordForm({ member }) {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!password) {
      setError("Please enter a password.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await createPassword({
        memberId: member.id,
        password,
      });

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "member",
        JSON.stringify(response.data.member)
      );

      setSuccess(response.message);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (err) {

      setError(
        err.response?.data?.message ||
          "Unable to create password."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="create-password-container">

      <form
        className="create-password-form"
        onSubmit={handleSubmit}
      >

        <div className="form-group">

          <label>Create Password</label>

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            value={password}
            placeholder="Enter password"
            onChange={(e) =>
              setPassword(e.target.value)
            }
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

          <label>Confirm Password</label>

          <input
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            value={confirmPassword}
            placeholder="Confirm password"
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
          />

        </div>

        <div className="checkbox-row">

          <label>

            <input
              type="checkbox"
              checked={showConfirmPassword}
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
            ? "Creating Account..."
            : "Create Password"}
        </button>

      </form>

    </div>
  );
}

export default CreatePasswordForm;