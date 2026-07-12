import { useState } from "react";
import {
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  Smartphone,
  Landmark,
  LoaderCircle,
} from "lucide-react";

import { usePayment } from "../../context/PaymentContext";

import "./Payment.css";

function Payment() {

  const {

    initiateMembershipPayment,

    loading,

  } = usePayment();

  const [error, setError] = useState("");

  /* ==========================================
     PAY
  ========================================== */

  const handlePayment = async () => {

    try {

      setError("");

      const response =

        await initiateMembershipPayment();

      if (

        response?.checkoutUrl

      ) {

        window.location.href =

          response.checkoutUrl;

      }

    } catch (err) {

      setError(

        err.response?.data?.message ||

        "Unable to initialize payment."

      );

    }

  };

  return (

    <div className="payment-page">

      <div className="payment-card">

        <div className="payment-header">

          <ShieldCheck size={48} />

          <h1>

            Complete Your Membership

          </h1>

          <p>

            Your account has been created successfully.

            Complete your membership payment to

            activate your account.

          </p>

        </div>

        <section className="payment-summary">

          <h2>

            Membership Details

          </h2>

          <div className="payment-row">

            <span>Membership Type</span>

            <strong>Ordinary</strong>

          </div>

          <div className="payment-row">

            <span>Membership Fee</span>

            <strong>KES 50</strong>

          </div>

          <div className="payment-row">

            <span>Validity</span>

            <strong>12 Months</strong>

          </div>

        </section>

        <section className="payment-benefits">

          <h2>

            Membership Benefits

          </h2>

          <ul>

            <li>

              <CheckCircle2 size={18} />

              Digital Membership Card

            </li>

            <li>

              <CheckCircle2 size={18} />

              Access to Events & Programs

            </li>

            <li>

              <CheckCircle2 size={18} />

              Certificates & Opportunities

            </li>

            <li>

              <CheckCircle2 size={18} />

              Leadership Participation

            </li>

          </ul>

        </section>

        <section className="payment-methods">

          <h2>

            Supported Payment Methods

          </h2>

          <div className="method-grid">

            <div className="method">

              <Smartphone size={24} />

              <span>M-Pesa</span>

            </div>

            <div className="method">

              <CreditCard size={24} />

              <span>Card</span>

            </div>

            <div className="method">

              <Landmark size={24} />

              <span>Bank</span>

            </div>

            <div className="method">

              <Smartphone size={24} />

              <span>Mobile Money</span>

            </div>

          </div>

        </section>

        {

          error && (

            <div className="payment-error">

              {error}

            </div>

          )

        }

        <button

          className="payment-button"

          onClick={handlePayment}

          disabled={loading}

        >

          {

            loading ? (

              <>

                <LoaderCircle

                  size={20}

                  className="spin"

                />

                Processing...

              </>

            ) : (

              "Pay with Flutterwave"

            )

          }

        </button>

      </div>

    </div>

  );

}

export default Payment;