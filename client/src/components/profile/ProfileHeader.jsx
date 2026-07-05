import { useAuth } from "../../context/AuthContext";

function ProfileHeader() {

  const { member } = useAuth();

  return (

    <section className="profile-header">

      <h1>

        {member?.firstName} {member?.lastName}

      </h1>

      <p>

        {member?.membershipNumber}

      </p>

      <span>

        {member?.membershipStatus}

      </span>

    </section>

  );

}

export default ProfileHeader;