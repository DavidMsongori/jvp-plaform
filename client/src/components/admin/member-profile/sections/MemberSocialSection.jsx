import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";

import {
  Globe,
  Pencil,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useAdmin } from "../../../../context/AdminContext";

function MemberSocialSection() {

  const navigate = useNavigate();

  const {

    selectedMember,

  } = useAdmin();

  if (!selectedMember) {

    return null;

  }

  const socialLinks = [

    {
      icon: <FaFacebook size={18} />,
      label: "Facebook",
      value: selectedMember.facebook,
    },

    {
      icon: <FaInstagram size={18} />,
      label: "Instagram",
      value: selectedMember.instagram,
    },

    {
      icon: <FaLinkedin size={18} />,
      label: "LinkedIn",
      value: selectedMember.linkedin,
    },

    {
      icon: <FaXTwitter size={18} />,
      label: "X (Twitter)",
      value: selectedMember.x,
    },

    {
      icon: <FaTiktok size={18} />,
      label: "TikTok",
      value: selectedMember.tiktok,
    },

    {
      icon: <Globe size={18} />,
      label: "Website",
      value: selectedMember.website,
    },

  ];

  return (

    <section className="member-profile-section">

      {/* ==========================================
          SECTION HEADER
      ========================================== */}

      <div className="member-profile-section-header">

        <div>

          <h2>

            Social Media

          </h2>

          <p>

            Connected social media accounts and online presence.

          </p>

        </div>

        <button

          className="section-edit-btn"

          onClick={() =>

            navigate(

              `/admin/members/${selectedMember._id}/edit`

            )

          }

        >

          <Pencil size={16} />

          Edit

        </button>

      </div>

      {/* ==========================================
          SOCIAL LINKS
      ========================================== */}

      <div className="member-profile-grid">

        {

          socialLinks.map((social) => (

            <div

              key={social.label}

              className="member-profile-field"

            >

              <label>

                {social.icon}

                {social.label}

              </label>

              {

                social.value ? (

                  <a

                    href={

                      social.value.startsWith("http")

                        ? social.value

                        : `https://${social.value}`

                    }

                    target="_blank"

                    rel="noopener noreferrer"

                    className="member-social-link"

                  >

                    {social.value}

                  </a>

                ) : (

                  <span>

                    -

                  </span>

                )

              }

            </div>

          ))

        }

      </div>

    </section>

  );

}

export default MemberSocialSection;