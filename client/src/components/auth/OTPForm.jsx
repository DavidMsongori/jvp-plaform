import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

function OTPForm({ member }) {

  const navigate = useNavigate();

  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const payload = {

        otp

      };

      if (member.email) {

        payload.email = member.email;

      } else {

        payload.phone = member.phone;

      }

      const response = await api.post(

        "/auth/verify-otp",

        payload

      );

      alert(response.data.message);

      navigate(

        "/create-password",

        {

          state: {

            member

          }

        }

      );

    } catch (error) {

      alert(

        error.response?.data?.message ||

        "OTP verification failed."

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <form onSubmit={handleSubmit}>

      <label>

        Verification Code

      </label>

      <input

        type="text"

        placeholder="Enter 6-digit OTP"

        value={otp}

        onChange={(e)=>setOtp(e.target.value)}

      />

      <button

        type="submit"

        disabled={loading}

      >

        {

          loading

          ?

          "Verifying..."

          :

          "Verify OTP"

        }

      </button>

    </form>

  );

}

export default OTPForm;