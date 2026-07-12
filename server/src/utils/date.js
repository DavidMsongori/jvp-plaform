/* ==========================================
   CURRENT DATE
========================================== */

export const currentDate = () => {
  return new Date();
};

/* ==========================================
   ADD DAYS
========================================== */

export const addDays = (date = new Date(), days = 0) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/* ==========================================
   ADD MONTHS
========================================== */

export const addMonths = (date = new Date(), months = 0) => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

/* ==========================================
   ADD YEARS
========================================== */

export const addYears = (date = new Date(), years = 1) => {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
};

/* ==========================================
   FIRST MEMBERSHIP EXPIRY
========================================== */

export const membershipExpiryDate = (
  paymentDate = new Date()
) => {
  return addYears(paymentDate, 1);
};

/* ==========================================
   MEMBERSHIP RENEWAL EXPIRY
========================================== */

export const renewalExpiryDate = (
  currentExpiry = null
) => {
  const today = new Date();

  const startDate =
    currentExpiry && new Date(currentExpiry) > today
      ? new Date(currentExpiry)
      : today;

  return addYears(startDate, 1);
};

/* ==========================================
   MEMBERSHIP STATUS CHECK
========================================== */

export const isMembershipActive = (member) => {
  if (!member) return false;

  if (member.membershipStatus !== "active") {
    return false;
  }

  if (!member.membershipExpiry) {
    return false;
  }

  return new Date(member.membershipExpiry) >= new Date();
};

export default {
  currentDate,
  addDays,
  addMonths,
  addYears,
  membershipExpiryDate,
  renewalExpiryDate,
  isMembershipActive,
};