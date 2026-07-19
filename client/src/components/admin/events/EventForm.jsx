import { useEffect, useState } from "react";

import "./EventForm.css";

import BasicInfoSection from "./sections/BasicInfoSection";
import ClassificationSection from "./sections/ClassificationSection";
import ScheduleSection from "./sections/ScheduleSection";
import VenueSection from "./sections/VenueSection";
import RegistrationSection from "./sections/RegistrationSection";
import MediaSection from "./sections/MediaSection";
import PublishSection from "./sections/PublishSection";

const defaultValues = {
  /* ==========================================
     BASIC INFORMATION
  ========================================== */

  title: "",
  slug: "",
  summary: "",
  description: "",

  /* ==========================================
     CLASSIFICATION
  ========================================== */

  category: "other",
  eventType: "physical",
  featured: false,

  /* ==========================================
     SCHEDULE
  ========================================== */

  startDate: "",
  endDate: "",
  timezone: "Africa/Nairobi",

  /* ==========================================
     VENUE
  ========================================== */

  venue: {
    name: "",
    address: "",
    county: "",
    city: "",
    googleMapsLink: "",
  },

  virtualLink: "",

  /* ==========================================
     REGISTRATION
  ========================================== */

  registration: {
    enabled: true,
    requiresMembership: false,
    paymentRequired: false,
    registrationFee: 0,
    currency: "KES",
    capacity: 0,
    minimumAge: "",
    maximumAge: "",
    allowWaitlist: true,
    approvalRequired: false,
    opensAt: "",
    closesAt: "",
  },

  /* ==========================================
     MEDIA
  ========================================== */

  coverImage: {
    file: null,
    preview: "",
    alt: "",
  },

  gallery: [],

  /* ==========================================
     PUBLISH
  ========================================== */

  isPublished: false,
};

const EventForm = ({
  initialValues = null,
  loading = false,
  mode = "create",
  onSubmit,
  onCancel,
}) => {
  const [form, setForm] = useState(defaultValues);

  useEffect(() => {
    if (!initialValues) return;

    setForm({
      ...defaultValues,
      ...initialValues,

      venue: {
        ...defaultValues.venue,
        ...(initialValues.venue || {}),
      },

      registration: {
        ...defaultValues.registration,
        ...(initialValues.registration || {}),
      },

      coverImage: {
        ...defaultValues.coverImage,
        ...(initialValues.coverImage || {}),
      },

      gallery: initialValues.gallery || [],
    });
  }, [initialValues]);

  /* ==========================================
     HELPERS
  ========================================== */

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateVenue = (venue) => {
    setForm((prev) => ({
      ...prev,
      venue,
    }));
  };

  const updateRegistration = (registration) => {
    setForm((prev) => ({
      ...prev,
      registration,
    }));
  };

  const updateCoverImage = (coverImage) => {
    setForm((prev) => ({
      ...prev,
      coverImage,
    }));
  };

  const updateGallery = (gallery) => {
    setForm((prev) => ({
      ...prev,
      gallery,
    }));
  };

  /* ==========================================
     SUBMIT
  ========================================== */

  const handleSubmit = () => {
    if (!onSubmit) return;

    onSubmit(form);
  };

  return (
    <form
      className="event-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <BasicInfoSection
        data={form}
        onChange={updateField}
      />

      <ClassificationSection
        data={form}
        onChange={updateField}
      />

      <ScheduleSection
        data={form}
        onChange={updateField}
      />

      <VenueSection
        venue={form.venue}
        virtualLink={form.virtualLink}
        eventType={form.eventType}
        onVenueChange={updateVenue}
        onVirtualLinkChange={(value) =>
          updateField("virtualLink", value)
        }
      />

      <RegistrationSection
        registration={form.registration}
        onChange={updateRegistration}
      />

      <MediaSection
        coverImage={form.coverImage}
        gallery={form.gallery}
        onCoverImageChange={updateCoverImage}
        onGalleryChange={updateGallery}
      />

      <PublishSection
        mode={mode}
        loading={loading}
        isPublished={form.isPublished}
        onPublishChange={(value) =>
          updateField("isPublished", value)
        }
        onCancel={onCancel}
      />
    </form>
  );
};

export default EventForm;