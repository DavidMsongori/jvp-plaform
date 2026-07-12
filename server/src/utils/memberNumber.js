import Counter from "../models/Counter.js";

/* ==========================================
   COUNTY CODES
========================================== */

const COUNTY_CODES = {
  Mombasa: "MSA",
  Kwale: "KWL",
  Kilifi: "KLF",
  "Tana River": "TRV",
  Lamu: "LMU",
  "Taita Taveta": "TTV",
};

/* ==========================================
   GENERATE MEMBER NUMBER
========================================== */

export const generateMemberNumber = async (county) => {
  const countyCode = COUNTY_CODES[county];

  if (!countyCode) {
    throw new Error("Invalid county.");
  }

  const year = new Date().getFullYear();

  const key = `MEMBER-${countyCode}-${year}`;

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

  const sequence = String(counter.sequence).padStart(5, "0");

  return `JVP/${countyCode}/${year}/${sequence}`;
};

export default generateMemberNumber;