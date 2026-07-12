import AuthLayout from "../../layouts/AuthLayout";
import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";

function ForgotPassword() {

  return (

    <AuthLayout
      title="Forgot Password?"
      subtitle="Enter the email address associated with your JVP Connect account and we'll send you a One-Time Password (OTP) to reset your password."
    >

      <div className="activation-info">

        <h3>

          Reset Your Password

        </h3>

        <p>

          If your email address is registered with JVP Connect, you'll
          receive a six-digit verification code. Use the code on the next
          screen to securely reset your password.

        </p>

      </div>

      <ForgotPasswordForm />

    </AuthLayout>

  );

}

export default ForgotPassword;