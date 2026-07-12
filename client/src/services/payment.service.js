import api from "./api";

/* ==========================================================
   INITIALIZE MEMBERSHIP PAYMENT
========================================================== */

export const initiateMembershipPayment = async () => {

  const response = await api.post(

    "/payments/membership"

  );

  return response.data;

};

/* ==========================================================
   VERIFY MEMBERSHIP PAYMENT
========================================================== */

export const verifyMembershipPayment = async (

  transactionId

) => {

  const response = await api.get(

    `/payments/verify/${transactionId}`

  );

  return response.data;

};

/* ==========================================================
   PAYMENT HISTORY
========================================================== */

export const getPaymentHistory = async () => {

  const response = await api.get(

    "/payments/history"

  );

  return response.data;

};

/* ==========================================================
   GET SINGLE PAYMENT
========================================================== */

export const getPayment = async (

  reference

) => {

  const response = await api.get(

    `/payments/${reference}`

  );

  return response.data;

};

/* ==========================================================
   ADMIN
========================================================== */

export const getAllPayments = async (

  filters = {}

) => {

  const response = await api.get(

    "/payments/admin/all",

    {

      params: filters,

    }

  );

  return response.data;

};

export const getPaymentStatistics = async () => {

  const response = await api.get(

    "/payments/admin/statistics"

  );

  return response.data;

};