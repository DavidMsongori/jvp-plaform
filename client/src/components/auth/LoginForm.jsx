import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "./LoginForm.css";

function LoginForm() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [identifier, setIdentifier] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    if (!identifier.trim()) {

      setError(
        "Please enter your phone number or email address."
      );

      return;

    }

    if (!password) {

      setError(
        "Please enter your password."
      );

      return;

    }

    const credentials = {
      password,
    };

    if (identifier.includes("@")) {

      credentials.email =
        identifier.trim().toLowerCase();

    } else {

      credentials.phone =
        identifier.trim();

    }

    try {

      setLoading(true);

      await login(credentials);

      navigate("/dashboard", {
        replace: true,
      });

    } catch (err) {

      console.error(err);

      setError(

        err.response?.data?.message ||

        "Invalid email/phone or password."

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="login-form-container">

      <form
        className="login-form"
        onSubmit={handleSubmit}
      >

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
            autoComplete="username"
          />

        </div>

        <div className="form-group">

          <label>Password</label>

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            autoComplete="current-password"
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

        {error && (

          <div className="form-error">

            {error}

          </div>

        )}

        <button
          type="submit"
          className="btn-primary"
          disabled={loading}
        >

          {loading
            ? "Signing In..."
            : "Login"}

        </button>

      </form>

      <div className="login-links">

        <Link to="/forgot-password">

          Forgot Password?

        </Link>

        <Link to="/activate-membership">

          Activate Membership

        </Link>

      </div>

    </div>

  );

}

export default LoginForm;