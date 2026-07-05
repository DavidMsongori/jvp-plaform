import { useAuth } from "../../context/AuthContext";

function PersonalInformation() {

  const { member } = useAuth();

  return (

    <section>

      <h2>

        Personal Information

      </h2>

      <p>

        First Name: {member?.firstName}

      </p>

      <p>

        Last Name: {member?.lastName}

      </p>

      <p>

        Gender: {member?.gender}

      </p>

      <p>

        Date of Birth: {member?.dob}

      </p>

    </section>

  );

}

export default PersonalInformation;