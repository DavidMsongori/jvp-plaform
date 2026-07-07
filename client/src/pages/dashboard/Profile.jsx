import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileForm from "../../components/profile/ProfileForm";
import ProfileSidebar from "../../components/profile/ProfileSidebar";

import "./Profile.css";

function Profile() {

  return (

    <div className="profile-page">

      <ProfileHeader />

      <div className="profile-content">

        <div className="profile-main">

          <ProfileForm />

        </div>

        <aside className="profile-side">

          <ProfileSidebar />

        </aside>

      </div>

    </div>

  );

}

export default Profile;