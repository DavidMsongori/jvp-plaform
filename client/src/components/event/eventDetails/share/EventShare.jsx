import React, { useMemo, useState } from "react";

import {
  Share2,
  Copy,
  Check,
  Mail,
} from "lucide-react";

import {
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

import "./EventShare.css";

const EventShare = ({ event }) => {
  if (!event) return null;

  const [copied, setCopied] = useState(false);

  const pageUrl = useMemo(
    () => window.location.href,
    []
  );

  const title =
    event.title || "JVP Connect Event";

  const description =
    event.shortDescription ||
    event.summary ||
    event.description ||
    "";

  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription =
    encodeURIComponent(description);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2500);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  const handleNativeShare = async () => {
    if (!navigator.share) return;

    try {
      await navigator.share({
        title,
        text: description,
        url: pageUrl,
      });
    } catch {
      // User cancelled sharing
    }
  };

  return (
    <section className="event-share">
      <div className="share-header">
        <h2>Share This Event</h2>

        <p>
          Invite colleagues, friends and fellow
          members to attend this event.
        </p>
      </div>

      <div className="share-card">

        {"share" in navigator && (
          <button
            className="share-primary"
            onClick={handleNativeShare}
          >
            <Share2 size={18} />
            <span>Share Event</span>
          </button>
        )}

        <div className="share-grid">

          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Facebook"
            title="Facebook"
          >
            <FaFacebookF size={20} />
            Facebook
          </a>

          <a
            href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on X"
            title="X"
          >
            <FaXTwitter size={20} />
            X
          </a>

          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on LinkedIn"
            title="LinkedIn"
          >
            <FaLinkedinIn size={20} />
            LinkedIn
          </a>

          <a
            href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on WhatsApp"
            title="WhatsApp"
          >
            <FaWhatsapp size={20} />
            WhatsApp
          </a>

          <a
            href={`mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`}
            aria-label="Share by Email"
            title="Email"
          >
            <Mail size={20} />
            Email
          </a>

          <button
            onClick={handleCopy}
            aria-label="Copy event link"
            title="Copy Link"
          >
            {copied ? (
              <>
                <Check size={20} />
                Copied
              </>
            ) : (
              <>
                <Copy size={20} />
                Copy Link
              </>
            )}
          </button>

        </div>
      </div>
    </section>
  );
};

export default EventShare;