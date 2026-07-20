import React from "react";
import {
  Hash,
  FileText,
  Eye,
  Star,
  CalendarDays,
  User,
  Users,
  Tag,
  Layers,
  Clock,
  Database,
} from "lucide-react";

import "./EventSystemInfo.css";

const EventSystemInfo = ({ event }) => {
  if (!event) return null;

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "—";

  const registration = event.registration || {};

  return (
    <section className="system-info">

      <div className="system-header">
        <h2>System Information</h2>
        <p>
          Administrative metadata and internal information for this event.
        </p>
      </div>

      <div className="system-grid">

        <div className="system-item">
          <Hash size={18} />
          <div>
            <span>Event ID</span>
            <strong>{event._id || "—"}</strong>
          </div>
        </div>

        <div className="system-item">
          <FileText size={18} />
          <div>
            <span>Slug</span>
            <strong>{event.slug || "—"}</strong>
          </div>
        </div>

        <div className="system-item">
          <Layers size={18} />
          <div>
            <span>Status</span>
            <strong>{event.status || "Draft"}</strong>
          </div>
        </div>

        <div className="system-item">
          <Eye size={18} />
          <div>
            <span>Visibility</span>
            <strong>{event.visibility || "Public"}</strong>
          </div>
        </div>

        <div className="system-item">
          <Star size={18} />
          <div>
            <span>Featured</span>
            <strong>{event.featured ? "Yes" : "No"}</strong>
          </div>
        </div>

        <div className="system-item">
          <Users size={18} />
          <div>
            <span>Registrations</span>
            <strong>{registration.registeredCount || 0}</strong>
          </div>
        </div>

        <div className="system-item">
          <Users size={18} />
          <div>
            <span>Capacity</span>
            <strong>{registration.capacity || "Unlimited"}</strong>
          </div>
        </div>

        <div className="system-item">
          <Eye size={18} />
          <div>
            <span>Views</span>
            <strong>{event.views || 0}</strong>
          </div>
        </div>

        <div className="system-item">
          <User size={18} />
          <div>
            <span>Created By</span>
            <strong>
              {event.createdBy?.fullName ||
                event.createdBy?.name ||
                "System"}
            </strong>
          </div>
        </div>

        <div className="system-item">
          <User size={18} />
          <div>
            <span>Updated By</span>
            <strong>
              {event.updatedBy?.fullName ||
                event.updatedBy?.name ||
                "System"}
            </strong>
          </div>
        </div>

        <div className="system-item">
          <CalendarDays size={18} />
          <div>
            <span>Created</span>
            <strong>{formatDate(event.createdAt)}</strong>
          </div>
        </div>

        <div className="system-item">
          <Clock size={18} />
          <div>
            <span>Last Updated</span>
            <strong>{formatDate(event.updatedAt)}</strong>
          </div>
        </div>

        <div className="system-item">
          <CalendarDays size={18} />
          <div>
            <span>Published</span>
            <strong>{formatDate(event.publishedAt)}</strong>
          </div>
        </div>

        <div className="system-item">
          <Database size={18} />
          <div>
            <span>Version</span>
            <strong>{event.version || 1}</strong>
          </div>
        </div>

      </div>

      {event.categories?.length > 0 && (
        <div className="system-section">

          <h3>Categories</h3>

          <div className="system-tags">
            {event.categories.map((category, index) => (
              <span key={index}>
                <Layers size={14} />
                {category}
              </span>
            ))}
          </div>

        </div>
      )}

      {event.tags?.length > 0 && (
        <div className="system-section">

          <h3>Tags</h3>

          <div className="system-tags">
            {event.tags.map((tag, index) => (
              <span key={index}>
                <Tag size={14} />
                {tag}
              </span>
            ))}
          </div>

        </div>
      )}

      {event.internalNotes && (
        <div className="system-section">

          <h3>Internal Notes</h3>

          <div className="system-notes">
            {event.internalNotes}
          </div>

        </div>
      )}

    </section>
  );
};

export default EventSystemInfo;