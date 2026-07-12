import AuthLayout from "../../layouts/AuthLayout";
import RegisterForm from "../../components/auth/RegisterForm";

function Register() {

  return (

    <AuthLayout
      title="Create Your Account"
      subtitle="Join Jumuiya ya Vijana wa Pwani."
    >

      <RegisterForm />

    </AuthLayout>

  );

}

export default Register;