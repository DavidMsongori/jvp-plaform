import { useState } from "react";
import { useNavigate } from "react-router-dom";

import * as authService from "../../services/auth.service";

import "./ActivateMembershipForm.css";

function ActivateMembershipForm() {

  const navigate = useNavigate();

  const [form, setForm] = useState({

    phone: "",

    email: "",

  });

 const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

    try {

      setLoading(true);

      const response =
        await authService.activateMembership(form);

      navigate("/verify-otp", {

        replace: true,

        state: {

          email: response.data.email,

          purpose: "ACCOUNT_ACTIVATION",

        },

      });

    } catch (err) {

      console.error(err);

      setError(

        err.response?.data?.message ||

        "Unable to activate membership."

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <form
      className="activate-membership-form"
      onSubmit={handleSubmit}
    >

      {error && (

        <div className="form-error">

          {error}

        </div>

      )}

      {/* Phone Number */}

      <div className="form-group">

        <label>

          Phone Number

        </label>

        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="07XXXXXXXX"
          autoComplete="tel"
          required
        />

      </div>

      {/* Email Address */}

      <div className="form-group">

        <label>

          Email Address

        </label>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email address"
          autoComplete="email"
          required
        />

      </div>

      <button
        type="submit"
        className="btn-primary"
        disabled={loading}
      >

        {loading
          ? "Activating..."
          : "Activate Membership"}

      </button>

    </form>

  );

}

export default ActivateMembershipForm;