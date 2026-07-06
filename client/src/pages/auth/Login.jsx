import AuthLayout from "../../components/auth/AuthLayout";
import LoginForm from "../../components/auth/LoginForm";

function Login() {
  return (
    <AuthLayout
      title="Member Login"
      subtitle="Sign in to your JVP Connect account to access your dashboard, membership card, events, programs, and more."
      sectionTitle="Welcome Back"
      sectionSubtitle="Enter your membership number, email address, or phone number together with your password."
    >
      <LoginForm />
    </AuthLayout>
  );
}

export default Login;