import MemberProfileHeader from "../../components/admin/member-profile/MemberProfileHeader";
import MemberProfileSidebar from "../../components/admin/member-profile/MemberProfileSidebar";

import MemberPersonalSection from "../../components/admin/member-profile/sections/MemberPersonalSection";
import MemberLocationSection from "../../components/admin/member-profile/sections/MemberLocationSection";
import MemberEducationSection from "../../components/admin/member-profile/sections/MemberEducationSection";
import MemberEmploymentSection from "../../components/admin/member-profile/sections/MemberEmploymentSection";
import MemberLeadershipSection from "../../components/admin/member-profile/sections/MemberLeadershipSection";
import MemberSkillsSection from "../../components/admin/member-profile/sections/MemberSkillsSection";
import MemberMembershipSection from "../../components/admin/member-profile/sections/MemberMembershipSection";
import MemberActivitySection from "../../components/admin/member-profile/sections/MemberActivitySection";
import MemberSystemSection from "../../components/admin/member-profile/sections/MemberSystemSection";
import MemberSocialSection from "../../components/admin/member-profile/sections/MemberSocialSection";

import "./MemberProfile.css";

function MemberProfile() {

  return (

    <section className="member-profile-page">

      <MemberProfileHeader />

      <div className="member-profile-layout">

        <div className="member-profile-content">

          <MemberPersonalSection />

          <MemberLocationSection />

          <MemberEducationSection />

          <MemberEmploymentSection />

          <MemberLeadershipSection />

          <MemberSkillsSection />

          <MemberMembershipSection />

          <MemberActivitySection />

          <MemberSystemSection />

          <MemberSocialSection />

        </div>

        <aside className="member-profile-sidebar">

          <MemberProfileSidebar />

        </aside>

      </div>

    </section>

  );

}

export default MemberProfile;