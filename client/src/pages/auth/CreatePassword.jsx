import { useLocation } from "react-router-dom";

import PageLayout from "../../components/common/PageLayout";
import PageHero from "../../components/common/PageHero";
import PageSection from "../../components/common/PageSection";

import CreatePasswordForm from "../../components/auth/CreatePasswordForm";

function CreatePassword() {

  const location = useLocation();

  const member = location.state?.member;

  return (
    <PageLayout>

      <PageHero
        title="Create Password"
        subtitle="Secure your JVP Connect account."
      />

      <PageSection
        title="Account Security"
        subtitle={
          member
            ? `Welcome ${member.firstName}`
            : "Create your password"
        }
      >

        <CreatePasswordForm member={member} />

      </PageSection>

    </PageLayout>
  );
}

export default CreatePassword;