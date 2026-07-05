import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

import "./LoginForm.css";

function LoginForm() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!identifier || !password) {

      return alert("Please enter your login details.");

    }

    try {

      setLoading(true);

      const payload = {

        password,

      };

      if (identifier.includes("@")) {

        payload.email = identifier;

      } else {

        payload.phone = identifier;

      }

      const response = await api.post(

        "/auth/login",

        payload

      );

      login(

        response.data.member,

        response.data.token

      );

      navigate("/dashboard");

    }

    catch (error) {

      console.error(error);

      alert(

        error.response?.data?.message ||

        "Login failed."

      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <>

      <div className="login-header">

        <h2>

          Welcome Back

        </h2>

        <p>

          Sign in to access your JVP Connect account.

        </p>

      </div>

      <form
        className="login-form"
        onSubmit={handleSubmit}
      >

        <div className="form-group">

          <label>

            Email Address or Phone Number

          </label>

          <div className="input-group">

            <FaEnvelope />

            <input
              type="text"
              placeholder="Enter your email or phone number"
              value={identifier}
              onChange={(e)=>setIdentifier(e.target.value)}
            />

          </div>

        </div>

        <div className="form-group">

          <label>

            Password

          </label>

          <div className="input-group">

            <FaLock />

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />

          </div>

        </div>

        <div className="login-options">

          <label className="remember">

            <input type="checkbox" />

            Remember Me

          </label>

          <Link to="/forgot-password">

            Forgot Password?

          </Link>

        </div>

        <button
          type="submit"
          className="login-btn"
          disabled={loading}
        >

          {

            loading

            ?

            "Logging in..."

            :

            "Login"

          }

        </button>

      </form>

      <div className="auth-divider">

        <span>

          OR

        </span>

      </div>

      <div className="auth-links">

        <Link
          to="/activate-membership"
          className="outline-btn"
        >

          Activate Existing Membership

        </Link>

        <p>

          New to JVP?

          <Link to="/register">

            Create an Account

          </Link>

        </p>

      </div>

    </>

  );

}

export default LoginForm;