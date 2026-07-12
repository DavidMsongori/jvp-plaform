import Counter from "../models/Counter.js";

/* ==========================================
   GENERATE PAYMENT REFERENCE
========================================== */

export const generatePaymentReference = async () => {
  const year = new Date().getFullYear();

  const key = `PAYMENT-${year}`;

  const counter = await Counter.findOneAndUpdate(
    { key },
    {
      $inc: {
        sequence: 1,
      },
    },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    }
  );

  const sequence = String(counter.sequence).padStart(6, "0");

  return `JVP-PAY-${year}-${sequence}`;
};

export default generatePaymentReference;