import React from "react";
import {
  Search,
  Globe,
  Tag,
  Link,
  Image,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

import "./EventSEO.css";

const EventSEO = ({ event }) => {
  if (!event) return null;

  const seo = event.seo || {};

  const checks = [
    {
      label: "SEO Title",
      valid: !!seo.title,
    },
    {
      label: "Meta Description",
      valid: !!seo.description,
    },
    {
      label: "Keywords",
      valid:
        Array.isArray(seo.keywords) &&
        seo.keywords.length > 0,
    },
    {
      label: "Canonical URL",
      valid: !!seo.canonicalUrl,
    },
    {
      label: "Open Graph Image",
      valid: !!seo.ogImage?.url,
    },
  ];

  const score = checks.filter(
    (item) => item.valid
  ).length;

  const percentage = Math.round(
    (score / checks.length) * 100
  );

  return (
    <section className="event-seo">

      <div className="seo-header">

        <h2>SEO Information</h2>

        <p>
          Search engine optimisation preview and metadata
          for this event.
        </p>

      </div>

      <div className="seo-score-card">

        <div className="seo-score-circle">
          {percentage}%
        </div>

        <div>

          <h3>SEO Score</h3>

          <p>
            {score} of {checks.length} SEO fields completed.
          </p>

        </div>

      </div>

      <div className="seo-grid">

        <div className="seo-card">

          <div className="seo-title">
            <Search size={18} />
            SEO Title
          </div>

          <p>
            {seo.title || "Not provided"}
          </p>

        </div>

        <div className="seo-card">

          <div className="seo-title">
            <Tag size={18} />
            Meta Description
          </div>

          <p>
            {seo.description ||
              "Not provided"}
          </p>

        </div>

        <div className="seo-card">

          <div className="seo-title">
            <Globe size={18} />
            Canonical URL
          </div>

          <p>
            {seo.canonicalUrl || "Not set"}
          </p>

        </div>

        <div className="seo-card">

          <div className="seo-title">
            <Link size={18} />
            Keywords
          </div>

          <div className="seo-tags">

            {seo.keywords?.length ? (
              seo.keywords.map(
                (keyword, index) => (
                  <span key={index}>
                    {keyword}
                  </span>
                )
              )
            ) : (
              <p>No keywords</p>
            )}

          </div>

        </div>

        <div className="seo-card">

          <div className="seo-title">
            <Image size={18} />
            Open Graph Image
          </div>

          {seo.ogImage?.url ? (

            <img
              src={seo.ogImage.url}
              alt="Open Graph"
              className="seo-image"
            />

          ) : (

            <p>No image uploaded.</p>

          )}

        </div>

      </div>

      <div className="seo-checklist">

        <h3>SEO Checklist</h3>

        {checks.map((item) => (

          <div
            key={item.label}
            className="seo-check"
          >

            {item.valid ? (
              <CheckCircle2 size={18} />
            ) : (
              <AlertTriangle size={18} />
            )}

            <span>{item.label}</span>

          </div>

        ))}

      </div>

    </section>
  );
};

export default EventSEO;