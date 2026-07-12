import {

  createContext,

  useContext,

  useState,

} from "react";

import * as paymentService from "../services/payment.service";

const PaymentContext = createContext();

/* ==========================================================
   PROVIDER
========================================================== */

export function PaymentProvider({

  children,

}) {

  const [loading, setLoading] =

    useState(false);

  const [error, setError] =

    useState("");

  const [payment, setPayment] =

    useState(null);

  const [history, setHistory] =

    useState([]);

  /* ========================================================
     INITIATE MEMBERSHIP PAYMENT
  ======================================================== */

  const initiateMembershipPayment = async () => {

    try {

      setLoading(true);

      setError("");

      const response =

        await paymentService.initiateMembershipPayment();

      setPayment(response.data);

      return response.data;

    } catch (err) {

      const message =

        err.response?.data?.message ||

        "Unable to initialize payment.";

      setError(message);

      throw err;

    } finally {

      setLoading(false);

    }

  };

  /* ========================================================
     VERIFY PAYMENT
  ======================================================== */

  const verifyMembershipPayment = async (

    transactionId

  ) => {

    try {

      setLoading(true);

      setError("");

      const response =

        await paymentService.verifyMembershipPayment(

          transactionId

        );

      setPayment(response.data);

      return response.data;

    } catch (err) {

      const message =

        err.response?.data?.message ||

        "Unable to verify payment.";

      setError(message);

      throw err;

    } finally {

      setLoading(false);

    }

  };

  /* ========================================================
     LOAD PAYMENT HISTORY
  ======================================================== */

  const loadPaymentHistory = async () => {

    try {

      setLoading(true);

      setError("");

      const response =

        await paymentService.getPaymentHistory();

      setHistory(response.data);

      return response.data;

    } catch (err) {

      const message =

        err.response?.data?.message ||

        "Unable to load payment history.";

      setError(message);

    } finally {

      setLoading(false);

    }

  };

  /* ========================================================
     GET PAYMENT
  ======================================================== */

  const getPayment = async (

    reference

  ) => {

    try {

      setLoading(true);

      setError("");

      const response =

        await paymentService.getPayment(

          reference

        );

      setPayment(response.data);

      return response.data;

    } catch (err) {

      const message =

        err.response?.data?.message ||

        "Unable to retrieve payment.";

      setError(message);

      throw err;

    } finally {

      setLoading(false);

    }

  };

  /* ========================================================
     CONTEXT
  ======================================================== */

  return (

    <PaymentContext.Provider

      value={{

        loading,

        error,

        payment,

        history,

        initiateMembershipPayment,

        verifyMembershipPayment,

        loadPaymentHistory,

        getPayment,

      }}

    >

      {children}

    </PaymentContext.Provider>

  );

}

/* ==========================================================
   HOOK
========================================================== */

export function usePayment() {

  const context =

    useContext(PaymentContext);

  if (!context) {

    throw new Error(

      "usePayment must be used inside PaymentProvider."

    );

  }

  return context;

}

export default PaymentContext;