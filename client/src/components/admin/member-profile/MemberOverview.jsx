import MemberPersonalSection from "./sections/MemberPersonalSection";
import MemberLocationSection from "./sections/MemberLocationSection";
import MemberEducationSection from "./sections/MemberEducationSection";
import MemberEmploymentSection from "./sections/MemberEmploymentSection";
import MemberLeadershipSection from "./sections/MemberLeadershipSection";
import MemberSkillsSection from "./sections/MemberSkillsSection";
import MemberSocialSection from "./sections/MemberSocialSection";
import MemberMembershipSection from "./sections/MemberMembershipSection";
import MemberActivitySection from "./sections/MemberActivitySection";
import MemberSystemSection from "./sections/MemberSystemSection";

import "./MemberOverview.css";

function MemberOverview() {

  return (

    <div className="member-overview">

      {/* ==========================================
          PERSONAL INFORMATION
      ========================================== */}

      <MemberPersonalSection />

      {/* ==========================================
          LOCATION
      ========================================== */}

      <MemberLocationSection />

      {/* ==========================================
          EDUCATION
      ========================================== */}

      <MemberEducationSection />

      {/* ==========================================
          EMPLOYMENT
      ========================================== */}

      <MemberEmploymentSection />

      {/* ==========================================
          LEADERSHIP
      ========================================== */}

      <MemberLeadershipSection />

      {/* ==========================================
          SKILLS
      ========================================== */}

      <MemberSkillsSection />

      {/* ==========================================
          SOCIAL
      ========================================== */}

      <MemberSocialSection />

      {/* ==========================================
          MEMBERSHIP
      ========================================== */}

      <MemberMembershipSection />

      {/* ==========================================
          ACTIVITY
      ========================================== */}

      <MemberActivitySection />

      {/* ==========================================
          SYSTEM
      ========================================== */}

      <MemberSystemSection />

    </div>

  );

}

export default MemberOverview;