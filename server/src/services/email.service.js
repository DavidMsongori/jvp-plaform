const { Resend } = require("resend");

const otpEmail = require("../templates/otpEmail");

const resend = new Resend(process.env.RESEND_API_KEY);

class EmailService {

  /* =====================================================
     SEND EMAIL
  ===================================================== */

  async sendEmail({
    to,
    subject,
    html,
    text = "",
  }) {
    try {

      const response = await resend.emails.send({

        from:
          process.env.EMAIL_FROM ||
          "JVP Connect <onboarding@resend.dev>",

        to: Array.isArray(to)
          ? to
          : [to],

        subject,

        html,

        text,

      });

      console.log(
        `✅ Email sent successfully to ${to}`
      );

      return response;

    } catch (error) {

      console.error(
        "❌ Email Service Error:",
        error
      );

      throw new Error(
        "Unable to send email."
      );

    }
  }

  /* =====================================================
     MEMBERSHIP ACTIVATION OTP
  ===================================================== */

  async sendOTPEmail({
    email,
    firstName,
    otp,
  }) {

    return this.sendEmail({

      to: email,

      subject:
        "JVP Connect Membership Verification",

      html: otpEmail({
        firstName,
        otp,
      }),

      text: `
Hello ${firstName},

Your JVP Connect verification code is:

${otp}

This code expires in 10 minutes.

If you did not request this verification,
please ignore this email.

Jumuiya ya Vijana wa Pwani
      `,

    });

  }

}

module.exports = new EmailService();