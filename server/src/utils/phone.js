function normalizePhone(phone) {
  if (!phone) return "";

  phone = phone.toString().trim();

  // Remove spaces and dashes
  phone = phone.replace(/[\s-]/g, "");

  // +254712345678
  if (phone.startsWith("+254")) {
    phone = phone.substring(1);
  }

  // 0712345678
  if (phone.startsWith("0")) {
    phone = "254" + phone.substring(1);
  }

  return phone;
}

module.exports = normalizePhone;