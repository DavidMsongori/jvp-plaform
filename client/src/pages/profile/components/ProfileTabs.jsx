import { useState } from "react";

import {
  User,
  MapPin,
  GraduationCap,
  Briefcase,
  Landmark,
  Sparkles,
  Globe,
} from "lucide-react";

import PersonalTab from "./tabs/PersonalTab";
import LocationTab from "./tabs/LocationTab";
import EducationTab from "./tabs/EducationTab";
import EmploymentTab from "./tabs/EmploymentTab";
import LeadershipTab from "./tabs/LeadershipTab";
import SkillsTab from "./tabs/SkillsTab";
import SocialTab from "./tabs/SocialTab";

import "./ProfileTabs.css";

const tabs = [

  {
    id: "personal",
    label: "Personal",
    icon: User,
  },

  {
    id: "location",
    label: "Location",
    icon: MapPin,
  },

  {
    id: "education",
    label: "Education",
    icon: GraduationCap,
  },

  {
    id: "employment",
    label: "Employment",
    icon: Briefcase,
  },

  {
    id: "leadership",
    label: "Leadership",
    icon: Landmark,
  },

  {
    id: "skills",
    label: "Skills",
    icon: Sparkles,
  },

  {
    id: "social",
    label: "Social",
    icon: Globe,
  },

];

function ProfileTabs() {

  const [activeTab, setActiveTab] =
    useState("personal");

  return (

    <div className="profile-tabs-card">

      {/* ============================
          TAB HEADER
      ============================= */}

      <div className="profile-tabs-header">

        {

          tabs.map((tab) => {

            const Icon = tab.icon;

            return (

              <button

                key={tab.id}

                className={`tab-btn ${
                  activeTab === tab.id
                    ? "active"
                    : ""
                }`}

                onClick={() =>
                  setActiveTab(tab.id)
                }

              >

                <Icon size={18} />

                {tab.label}

              </button>

            );

          })

        }

      </div>

      {/* ============================
          CONTENT
      ============================= */}

      <div className="profile-tab-content">

        {

          activeTab === "personal" &&

          <PersonalTab />

        }

        {

          activeTab === "location" &&

          <LocationTab />

        }

        {

          activeTab === "education" &&

          <EducationTab />

        }

        {

          activeTab === "employment" &&

          <EmploymentTab />

        }

        {

          activeTab === "leadership" &&

          <LeadershipTab />

        }

        {

          activeTab === "skills" &&

          <SkillsTab />

        }

        {

          activeTab === "social" &&

          <SocialTab />

        }

      </div>

    </div>

  );

}

export default ProfileTabs;