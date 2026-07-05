const Member = require("../models/Member");

const countyCodes = {
  "Mombasa": "MOM",
  "Kwale": "KWL",
  "Kilifi": "KLF",
  "Tana River": "TNR",
  "Lamu": "LAM",
  "Taita Taveta": "TTV",
};

const generateMembershipNumber = async (county) => {

  const code = countyCodes[county];

  if (!code) {
    throw new Error(`Unsupported county: ${county}`);
  }

  const year = new Date().getFullYear();

  const prefix = `JVP/${code}/${year}/`;

  const latestMember = await Member.findOne({
    membershipNumber: {
      $regex: `^${prefix}`
    }
  }).sort({
    membershipNumber: -1
  });

  let nextNumber = 1;

  if (latestMember) {

    const parts = latestMember.membershipNumber.split("/");

    nextNumber = parseInt(parts[3], 10) + 1;

  }

  return `${prefix}${String(nextNumber).padStart(5, "0")}`;

};

module.exports = generateMembershipNumber;