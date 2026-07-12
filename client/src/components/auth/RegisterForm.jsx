import { useState } from "react";
import { useNavigate } from "react-router-dom";

import * as authService from "../../services/auth.service";

import "./RegisterForm.css";

function RegisterForm() {

  const navigate = useNavigate();

  const [form, setForm] = useState({

    firstName: "",

    middleName: "",

    lastName: "",

    gender: "",

    dateOfBirth: "",

    nationalId: "",

    phone: "",

    occupation: "",

    county: "",

    membershipType: "ordinary",

    email: "",

  });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  /* ==========================================
     HANDLE INPUT CHANGE
  ========================================== */

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm((prev) => ({

      ...prev,

      [name]: value,

    }));

  };

  /* ==========================================
     REGISTER
  ========================================== */

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    try {

      setLoading(true);

      const response =
        await authService.register(form);

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

        "Registration failed."

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <form
      className="register-form"
      onSubmit={handleSubmit}
    >

      {error && (

        <div className="form-error">

          {error}

        </div>

      )}

      <div className="form-grid">

        {/* First Name */}

        <div className="form-group">

          <label>

            First Name

          </label>

          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="Enter first name"
            required
          />

        </div>

        {/* Middle Name */}

        <div className="form-group">

          <label>

            Middle Name

          </label>

          <input
            type="text"
            name="middleName"
            value={form.middleName}
            onChange={handleChange}
            placeholder="Enter middle name"
          />

        </div>

        {/* Last Name */}

        <div className="form-group">

          <label>

            Last Name

          </label>

          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Enter last name"
            required
          />

        </div>

        {/* Gender */}

        <div className="form-group">

          <label>

            Gender

          </label>

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
          >

            <option value="">
              Select Gender
            </option>

            <option value="male">
              Male
            </option>

            <option value="female">
              Female
            </option>

          </select>

        </div>

        {/* Date of Birth */}

        <div className="form-group">

          <label>

            Date of Birth

          </label>

          <input
            type="date"
            name="dateOfBirth"
            value={form.dateOfBirth}
            onChange={handleChange}
            required
          />

        </div>

        {/* National ID */}

        <div className="form-group">

          <label>

            National ID

          </label>

          <input
            type="text"
            name="nationalId"
            value={form.nationalId}
            onChange={handleChange}
            placeholder="Enter National ID"
            required
          />

        </div>

        {/* Phone */}

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
            required
          />

        </div>

        {/* Occupation */}

        <div className="form-group">

          <label>

            Occupation

          </label>

          <input
            type="text"
            name="occupation"
            value={form.occupation}
            onChange={handleChange}
            placeholder="Enter occupation"
            required
          />

        </div>

        {/* County */}

        <div className="form-group">

          <label>

            County

          </label>

          <select
            name="county"
            value={form.county}
            onChange={handleChange}
            required
          >

            <option value="">
              Select County
            </option>

            <option value="Mombasa">
              Mombasa
            </option>

            <option value="Kwale">
              Kwale
            </option>

            <option value="Kilifi">
              Kilifi
            </option>

            <option value="Tana River">
              Tana River
            </option>

            <option value="Lamu">
              Lamu
            </option>

            <option value="Taita Taveta">
              Taita Taveta
            </option>

          </select>

        </div>

        {/* Membership Type */}

        <div className="form-group">

          <label>

            Membership Type

          </label>

          <select
            name="membershipType"
            value={form.membershipType}
            onChange={handleChange}
          >

            <option value="ordinary">
              Ordinary Membership
            </option>

            <option value="leadership">
              Leadership Membership
            </option>

          </select>

        </div>

        {/* Email */}

        <div className="form-group full-width">

          <label>

            Email Address

          </label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="example@email.com"
            required
          />

        </div>

      </div>

      <button
        type="submit"
        className="btn-primary"
        disabled={loading}
      >

        {loading
          ? "Creating Account..."
          : "Create Account"}

      </button>

    </form>

  );

}

export default RegisterForm;