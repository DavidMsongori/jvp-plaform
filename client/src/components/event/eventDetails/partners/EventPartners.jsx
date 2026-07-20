import React from "react";

import {
  Globe,
  ExternalLink,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

import "./EventPartners.css";

const EventPartners = ({ event }) => {
  if (!event?.partners?.length) return null;

  const partners = event.partners
    .filter((partner) => partner?.isActive !== false)
    .sort(
      (a, b) =>
        (a.displayOrder || 0) -
        (b.displayOrder || 0)
    );

  const getSocialLink = (partner, platform) =>
    partner?.socialLinks?.[platform] ||
    partner?.social?.[platform] ||
    null;

  return (
    <section className="event-partners">
      <div className="partners-header">
        <h2>Our Partners</h2>

        <p>
          This event is made possible through the support of our
          valued partners and sponsors.
        </p>
      </div>

      <div className="partners-grid">
        {partners.map((partner, index) => {
          const logo =
            partner.logo?.url ||
            "https://placehold.co/500x300?text=Partner";

          const facebook = getSocialLink(partner, "facebook");
          const instagram = getSocialLink(partner, "instagram");
          const linkedin = getSocialLink(partner, "linkedin");
          const youtube = getSocialLink(partner, "youtube");

          return (
            <article
              className="partner-card"
              key={partner._id || index}
            >
              {partner.featured && (
                <span className="partner-featured">
                  Featured Partner
                </span>
              )}

              <div className="partner-logo">
                <img
                  src={logo}
                  alt={partner.name}
                  loading="lazy"
                />
              </div>

              <div className="partner-content">
                <h3>{partner.name}</h3>

                {partner.category && (
                  <span className="partner-category">
                    {partner.category}
                  </span>
                )}

                {partner.description && (
                  <p>{partner.description}</p>
                )}

                {(partner.website ||
                  facebook ||
                  instagram ||
                  linkedin ||
                  youtube) && (
                  <div className="partner-links">
                    {partner.website && (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${partner.name} Website`}
                        title="Website"
                      >
                        <Globe size={18} />
                      </a>
                    )}

                    {facebook && (
                      <a
                        href={facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${partner.name} Facebook`}
                        title="Facebook"
                      >
                        <FaFacebookF size={18} />
                      </a>
                    )}

                    {instagram && (
                      <a
                        href={instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${partner.name} Instagram`}
                        title="Instagram"
                      >
                        <FaInstagram size={18} />
                      </a>
                    )}

                    {linkedin && (
                      <a
                        href={linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${partner.name} LinkedIn`}
                        title="LinkedIn"
                      >
                        <FaLinkedinIn size={18} />
                      </a>
                    )}

                    {youtube && (
                      <a
                        href={youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${partner.name} YouTube`}
                        title="YouTube"
                      >
                        <FaYoutube size={18} />
                      </a>
                    )}

                    {partner.website && (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${partner.name} Visit Website`}
                        title="Visit Website"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default EventPartners;