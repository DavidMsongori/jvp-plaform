import AuthLayout from "../../layouts/AuthLayout";
import ActivateMembershipForm from "../../components/auth/ActivateMembershipForm";

function ActivateMembership() {

  return (

    <AuthLayout
      title="Activate Your Membership"
      subtitle="If you were previously registered as a JVP member, verify your details below to activate your online account."
    >

      <div className="activation-info">

        <h3>

          Existing Members

        </h3>

        <p>

          Enter the same National ID and phone number used during your
          membership registration. Once your details are verified, a
          one-time verification code (OTP) will be sent to your email
          address so you can securely activate your account.

        </p>

      </div>

      <ActivateMembershipForm />

    </AuthLayout>

  );

}

export default ActivateMembership;