import AuthLayout from "../../components/auth/AuthLayout";
import ClaimForm from "../../components/auth/ClaimForm";

function ClaimMembership() {
  return (
    <AuthLayout
      title="Activate Your Membership"
      subtitle="Existing Jumuiya ya Vijana wa Pwani (JVP) members can activate their JVP Connect account."
      sectionTitle="Membership Activation"
      sectionSubtitle="Enter the phone number or email address registered with JVP to begin the activation process."
    >
      <ClaimForm />
    </AuthLayout>
  );
}

export default ClaimMembership;