import AuthLayout from "../../layouts/AuthLayout";
import ResetPasswordForm from "../../components/auth/ResetPasswordForm";

function ResetPassword() {

  return (

    <AuthLayout
      title="Reset Your Password"
      subtitle="Enter the verification code sent to your email and create a new password for your JVP Connect account."
    >

      <div className="activation-info">

        <h3>

          Create a New Password

        </h3>

        <p>

          Enter the six-digit verification code that was sent to your
          email address, then create a strong new password. After
          successfully resetting your password, you'll be redirected to
          the login page where you can sign in with your new credentials.

        </p>

      </div>

      <ResetPasswordForm />

    </AuthLayout>

  );

}

export default ResetPassword;