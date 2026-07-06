import { useLocation, Navigate } from "react-router-dom";

import AuthLayout from "../../components/auth/AuthLayout";
import CreatePasswordForm from "../../components/auth/CreatePasswordForm";

function CreatePassword() {
  const location = useLocation();

  const member = location.state?.member;

  // Prevent direct access without completing OTP verification
  if (!member) {
    return <Navigate to="/activate-membership" replace />;
  }

  return (
    <AuthLayout
      title="Create Your Password"
      subtitle="You're almost done! Create a secure password to complete your JVP Connect account activation."
      sectionTitle="Account Security"
      sectionSubtitle={`Welcome ${member.firstName}. Choose a strong password to secure your account.`}
    >
      <CreatePasswordForm member={member} />
    </AuthLayout>
  );
}

export default CreatePassword;