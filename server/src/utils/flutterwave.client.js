import axios from "axios";

import flutterwaveConfig from "../config/flutterwave.js";

/* ==========================================================
   AXIOS CLIENT
========================================================== */

const flutterwave = axios.create({

  baseURL: flutterwaveConfig.baseUrl,

  headers: {

    Authorization: `Bearer ${flutterwaveConfig.secretKey}`,

    "Content-Type": "application/json",

  },

  timeout: 30000,

});

/* ==========================================================
   CREATE PAYMENT LINK
========================================================== */

export const createPaymentLink = async (payload) => {

  try {

    const response = await flutterwave.post(

      "/payments",

      payload

    );

    return response.data;

  } catch (error) {

    throw normalizeFlutterwaveError(error);

  }

};

/* ==========================================================
   VERIFY TRANSACTION
========================================================== */

export const verifyTransaction = async (

  transactionId

) => {

  try {

    const response = await flutterwave.get(

      `/transactions/${transactionId}/verify`

    );

    return response.data;

  } catch (error) {

    throw normalizeFlutterwaveError(error);

  }

};

/* ==========================================================
   GET TRANSACTION
========================================================== */

export const getTransaction = async (

  transactionId

) => {

  try {

    const response = await flutterwave.get(

      `/transactions/${transactionId}`

    );

    return response.data;

  } catch (error) {

    throw normalizeFlutterwaveError(error);

  }

};

/* ==========================================================
   REFUND PAYMENT
========================================================== */

export const refundTransaction = async (

  transactionId,

  amount

) => {

  try {

    const response = await flutterwave.post(

      `/transactions/${transactionId}/refund`,

      {

        amount,

      }

    );

    return response.data;

  } catch (error) {

    throw normalizeFlutterwaveError(error);

  }

};

/* ==========================================================
   VERIFY WEBHOOK SIGNATURE
========================================================== */

export const verifyWebhook = (

  signature

) => {

  return (

    signature ===

    flutterwaveConfig.webhookSecret

  );

};

/* ==========================================================
   NORMALIZE ERRORS
========================================================== */

function normalizeFlutterwaveError(error) {

  if (error.response) {

    return new Error(

      error.response.data?.message ||

      "Flutterwave request failed."

    );

  }

  if (error.request) {

    return new Error(

      "Unable to reach Flutterwave."

    );

  }

  return new Error(

    error.message ||

    "Flutterwave error."

  );

}

/* ==========================================================
   EXPORT
========================================================== */

export default {

  createPaymentLink,

  verifyTransaction,

  getTransaction,

  refundTransaction,

  verifyWebhook,

};