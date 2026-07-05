import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

import "./CreatePasswordForm.css";

function CreatePasswordForm({ member }) {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!password || !confirmPassword) {

      return alert("Please complete all fields.");

    }

    if (password !== confirmPassword) {

      return alert("Passwords do not match.");

    }

    if (password.length < 8) {

      return alert("Password must be at least 8 characters.");

    }

    try {

      setLoading(true);

      const response = await api.post(

        "/password/create-password",

        {

          memberId: member.id,

          password

        }

      );

      login(

        response.data.member,

        response.data.token

      );

      alert(response.data.message);

      navigate("/dashboard");

    }

    catch (error) {

      alert(

        error.response?.data?.message ||

        "Unable to create password."

      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <form
      className="create-password-form"
      onSubmit={handleSubmit}
    >

      <label>

        Password

      </label>

      <input

        type="password"

        placeholder="Enter Password"

        value={password}

        onChange={(e)=>setPassword(e.target.value)}

      />

      <label>

        Confirm Password

      </label>

      <input

        type="password"

        placeholder="Confirm Password"

        value={confirmPassword}

        onChange={(e)=>setConfirmPassword(e.target.value)}

      />

      <button
        type="submit"
        disabled={loading}
      >

        {

          loading

          ?

          "Creating Account..."

          :

          "Create Password"

        }

      </button>

    </form>

  );

}

export default CreatePasswordForm;