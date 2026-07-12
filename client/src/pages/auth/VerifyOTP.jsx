import AuthLayout from "../../layouts/AuthLayout";
import OTPForm from "../../components/auth/OTPForm";

function VerifyOTP() {

  return (

    <AuthLayout
      title="Verify Your Email"
      subtitle="Enter the verification code sent to your email."
    >

      <OTPForm />

    </AuthLayout>

  );

}

export default VerifyOTP;