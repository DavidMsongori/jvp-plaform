import { useLocation, Navigate } from "react-router-dom";

import AuthLayout from "../../components/auth/AuthLayout";
import OTPForm from "../../components/auth/OTPForm";

function VerifyOTP() {
  const location = useLocation();

  const member = location.state?.member;

  // Prevent direct access without first activating membership
  if (!member) {
    return <Navigate to="/activate-membership" replace />;
  }

  return (
    <AuthLayout
      title="Verify Your Membership"
      subtitle="A One-Time Password (OTP) has been sent to your registered phone number or email address."
      sectionTitle="OTP Verification"
      sectionSubtitle={`Welcome ${member.firstName}. Enter the verification code to continue.`}
    >
      <OTPForm member={member} />
    </AuthLayout>
  );
}

export default VerifyOTP;