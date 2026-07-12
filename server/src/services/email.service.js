import { Resend } from "resend";

/* ==========================================================
   RESEND CLIENT
========================================================== */

const RESEND_API_KEY = process.env.RESEND_API_KEY;

const resend = RESEND_API_KEY
  ? new Resend(RESEND_API_KEY)
  : null;

/* ==========================================================
   GENERIC EMAIL SENDER
========================================================== */

export const sendEmail = async ({
  to,
  subject,
  html,
  text,
  replyTo,
  attachments = [],
}) => {
  /* ----------------------------------------
     DEVELOPMENT MODE
  ---------------------------------------- */

  if (!resend) {
    console.warn(
      "⚠️ RESEND_API_KEY not configured. Email sending skipped."
    );

    console.log({
      to,
      subject,
      text,
    });

    return {
      success: true,
      development: true,
    };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      text,
      replyTo,
      attachments,
    });

    if (error) {
      console.error("Resend Error:", error);

      return {
        success: false,
        error,
      };
    }

    return {
      success: true,
      id: data.id,
    };
  } catch (error) {
    console.error("Email Service Error:", error);

    return {
      success: false,
      error: error.message,
    };
  }
};

/* ==========================================================
   SEND OTP EMAIL
========================================================== */

export const sendOTPEmail = async ({
  email,
  firstName = "Member",
  otp,
}) => {
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:40px;background:#ffffff;border:1px solid #e5e5e5;border-radius:10px;">

        <h2 style="color:#0056b3;">
            JVP Connect
        </h2>

        <p>Hello <strong>${firstName}</strong>,</p>

        <p>Your verification code is:</p>

        <div
            style="
                margin:30px 0;
                font-size:36px;
                font-weight:bold;
                letter-spacing:8px;
                text-align:center;
                background:#f4f6f8;
                padding:20px;
                border-radius:8px;
            "
        >
            ${otp}
        </div>

        <p>
            This code expires in
            <strong>10 minutes</strong>.
        </p>

        <p>
            If you did not request this code,
            you can safely ignore this email.
        </p>

        <hr>

        <small>
            © ${new Date().getFullYear()} JVP Connect
        </small>

    </div>
  `;

  return sendEmail({
    to: email,
    subject: "Your Verification Code",
    html,
    text: `Your verification code is ${otp}`,
  });
};

/* ==========================================================
   WELCOME EMAIL
========================================================== */

export const sendWelcomeEmail = async ({
  email,
  firstName = "Member",
}) => {
  const html = `
    <div style="font-family:Arial;padding:40px;">

        <h2>Welcome to JVP Connect</h2>

        <p>Hello <strong>${firstName}</strong>,</p>

        <p>Your account has been successfully activated.</p>

        <p>
            Welcome to the JVP community.
        </p>

    </div>
  `;

  return sendEmail({
    to: email,
    subject: "Welcome to JVP Connect",
    html,
    text: "Welcome to JVP Connect",
  });
};

/* ==========================================================
   PASSWORD RESET EMAIL
========================================================== */

export const sendPasswordResetEmail = async ({
  email,
  firstName = "Member",
  otp,
}) => {
  const html = `
    <div style="font-family:Arial;padding:40px;">

        <h2>Password Reset</h2>

        <p>Hello <strong>${firstName}</strong>,</p>

        <p>Your password reset code is:</p>

        <div
            style="
                margin:30px 0;
                font-size:34px;
                font-weight:bold;
                letter-spacing:6px;
                text-align:center;
                background:#f5f5f5;
                padding:20px;
                border-radius:8px;
            "
        >
            ${otp}
        </div>

        <p>
            This code expires in 10 minutes.
        </p>

    </div>
  `;

  return sendEmail({
    to: email,
    subject: "Reset Your Password",
    html,
    text: `Your password reset code is ${otp}`,
  });
};

/* ==========================================================
   MEMBERSHIP APPROVED
========================================================== */

export const sendApprovalEmail = async ({
  email,
  firstName = "Member",
}) => {
  const html = `
    <div style="font-family:Arial;padding:40px;">

        <h2>Membership Approved</h2>

        <p>Hello <strong>${firstName}</strong>,</p>

        <p>
            Congratulations!
        </p>

        <p>
            Your membership has been approved.
        </p>

    </div>
  `;

  return sendEmail({
    to: email,
    subject: "Membership Approved",
    html,
    text: "Your membership has been approved.",
  });
};

/* ==========================================================
   MEMBERSHIP REJECTED
========================================================== */

export const sendRejectionEmail = async ({
  email,
  firstName = "Member",
  reason,
}) => {
  const html = `
    <div style="font-family:Arial;padding:40px;">

        <h2>Membership Update</h2>

        <p>Hello <strong>${firstName}</strong>,</p>

        <p>
            Unfortunately your membership application
            was not approved.
        </p>

        <p><strong>Reason</strong></p>

        <blockquote>
            ${reason}
        </blockquote>

    </div>
  `;

  return sendEmail({
    to: email,
    subject: "Membership Application Update",
    html,
    text: reason,
  });
};

/* ==========================================================
   DEFAULT EXPORT
========================================================== */

export default {
  sendEmail,
  sendOTPEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendApprovalEmail,
  sendRejectionEmail,
};