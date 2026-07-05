import PageLayout from "../../components/common/PageLayout";
import PageHero from "../../components/common/PageHero";
import PageSection from "../../components/common/PageSection";

import ClaimForm from "../../components/auth/ClaimForm";

function ClaimMembership() {
  return (
    <PageLayout>
      <PageHero
        title="Activate Membership"
        subtitle="Existing members can activate their JVP Connect account."
      />

      <PageSection
        title="Membership Activation"
        subtitle="Verify your existing membership."
      >
        <ClaimForm />
      </PageSection>
    </PageLayout>
  );
}

export default ClaimMembership;