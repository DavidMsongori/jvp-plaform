import { useState } from "react";
import { CheckCircle2, Circle, Smartphone, CreditCard, ShieldCheck } from "lucide-react";

import { useAuth } from "../../context/AuthContext";

import "./Payment.css";

function Payment() {

  const { member } = useAuth();

  const [phone, setPhone] = useState(
    member?.phone || ""
  );

  const membershipType =
    member?.membershipType || "ordinary";

  const amount =
    membershipType === "leadership"
      ? 100
      : 50;

  const handlePayment = () => {

    // TODO
    // STK Push integration

    console.log("Initiate Payment", {
      phone,
      amount,
    });

  };

  return (

    <div className="payment-page">

      <div className="payment-card">

        <div className="payment-header">

          <ShieldCheck size={50} />

          <h1>

            Activate Your Membership

          </h1>

          <p>

            Your account has been created successfully.
            Complete your membership payment to unlock
            the JVP Connect Dashboard.

          </p>

        </div>

        {/* ================================= */}

        <div className="activation-steps">

          <div className="step complete">

            <CheckCircle2 size={20} />

            Registration

          </div>

          <div className="step complete">

            <CheckCircle2 size={20} />

            Email Verification

          </div>

          <div className="step complete">

            <CheckCircle2 size={20} />

            Password Created

          </div>

          <div className="step active">

            <Circle size={20} />

            Membership Payment

          </div>

          <div className="step">

            <Circle size={20} />

            Dashboard Access

          </div>

        </div>

        {/* ================================= */}

        <div className="membership-summary">

          <h2>

            Membership Summary

          </h2>

          <div className="summary-grid">

            <div>

              <small>Membership Type</small>

              <strong>

                {membershipType}

              </strong>

            </div>

            <div>

              <small>Membership Fee</small>

              <strong>

                KES {amount}

              </strong>

            </div>

            <div>

              <small>Status</small>

              <strong>

                Pending Payment

              </strong>

            </div>

            <div>

              <small>Member Number</small>

              <strong>

                {member?.memberNumber || "-"}

              </strong>

            </div>

          </div>

        </div>

        {/* ================================= */}

        <div className="payment-method">

          <h2>

            Pay with M-Pesa

          </h2>

          <p>

            Enter the Safaricom phone number that
            will receive the STK Push.

          </p>

          <label>

            Phone Number

          </label>

          <input

            value={phone}

            onChange={(e)=>setPhone(e.target.value)}

            placeholder="254712345678"

          />

          <button
            className="pay-btn"
            onClick={handlePayment}
          >

            <Smartphone size={20}/>

            Pay KES {amount}

          </button>

        </div>

      </div>

    </div>

  );

}

export default Payment;