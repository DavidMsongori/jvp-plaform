import PageLayout from "../../components/common/PageLayout";
import PageHero from "../../components/common/PageHero";
import PageSection from "../../components/common/PageSection";

import LoginForm from "../../components/auth/LoginForm";

function Login() {
  return (
    <PageLayout>

      <PageHero
        title="Member Login"
        subtitle="Access your JVP Connect account."
      />

      <PageSection
        title="Login"
        subtitle="Sign in to your account."
      >

        <LoginForm />

      </PageSection>

    </PageLayout>
  );
}

export default Login;