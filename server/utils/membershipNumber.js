const Member = require("../models/Member");

const countyCodes = {
  Mombasa: "MOM",
  Kilifi: "KLF",
  Kwale: "KWL",
  Lamu: "LAM",
  "Taita Taveta": "TTA",
  "Tana River": "TNR",
};

async function generateMembershipNumber(county) {
  const year = new Date().getFullYear();

  const countyCode = countyCodes[county];

  if (!countyCode) {
    throw new Error("Invalid county supplied.");
  }

  // Count members from this county only
  const countyMembers = await Member.countDocuments({
    county,
  });

  const serial = String(countyMembers + 1).padStart(6, "0");

  return `JVP/${countyCode}/${year}/${serial}`;
}

module.exports = generateMembershipNumber;