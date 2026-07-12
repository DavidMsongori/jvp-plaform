import {
  membershipExpiryDate,
  renewalExpiryDate,
} from "./date.js";

/* ==========================================
   ACTIVATE MEMBERSHIP
========================================== */

export const activateMembership = (
  member,
  effectiveDate = new Date()
) => {
  member.membershipFeePaid = true;
  member.membershipStatus = "active";
  member.membershipExpiry =
    membershipExpiryDate(effectiveDate);

  return member;
};

/* ==========================================
   RENEW MEMBERSHIP
========================================== */

export const renewMembership = (member) => {
  member.membershipFeePaid = true;
  member.membershipStatus = "active";
  member.membershipExpiry =
    renewalExpiryDate(member.membershipExpiry);

  return member;
};

/* ==========================================
   EXPIRE MEMBERSHIP
========================================== */

export const expireMembership = (member) => {
  member.membershipStatus = "expired";

  return member;
};

/* ==========================================
   DEACTIVATE MEMBERSHIP
========================================== */

export const deactivateMembership = (member) => {
  member.membershipStatus = "inactive";

  return member;
};

export default {
  activateMembership,
  renewMembership,
  expireMembership,
  deactivateMembership,
};