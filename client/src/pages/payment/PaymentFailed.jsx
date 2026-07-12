import { XCircle } from "lucide-react";

import { useNavigate } from "react-router-dom";

import "./Payment.css";

function PaymentFailed() {

  const navigate = useNavigate();

  return (

    <div className="payment-result failed">

      <XCircle

        size={72}

      />

      <h1>

        Payment Failed

      </h1>

      <p>

        Unfortunately we could not complete your payment.

      </p>

      <p>

        You can try again or return later.

      </p>

      <div className="payment-actions">

        <button

          className="payment-button"

          onClick={() =>

            navigate("/payment")

          }

        >

          Try Again

        </button>

      </div>

    </div>

  );

}

export default PaymentFailed;