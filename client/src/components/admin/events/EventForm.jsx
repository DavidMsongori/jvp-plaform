import { useEffect, useState } from "react";

import BasicInfoSection from "./sections/BasicInfoSection";
import ClassificationSection from "./sections/ClassificationSection";
import ScheduleSection from "./sections/ScheduleSection";
import RegistrationSection from "./sections/RegistrationSection";
import MediaSection from "./sections/MediaSection";
import VenueSection from "./sections/VenueSection";
import PublishSection from "./sections/PublishSection";

const defaultValues = {
  /* =====================================================
     BASIC INFORMATION
  ===================================================== */

  title: "",
  slug: "",
  shortDescription: "",
  description: "",

  /* =====================================================
     CLASSIFICATION
  ===================================================== */

  category: "other",
  eventType: "physical",
  featured: false,

  /* =====================================================
     SCHEDULE
  ===================================================== */

  startDate: "",
  endDate: "",
  timezone: "Africa/Nairobi",

  /* =====================================================
     MEDIA
  ===================================================== */

  coverImage: {
    file: null,
    preview: "",
    alt: "",
  },

  gallery: [],

  /* =====================================================
     VENUE
  ===================================================== */

  venue: "",

  /* =====================================================
     REGISTRATION
  ===================================================== */

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

  /* =====================================================
     STATUS
  ===================================================== */

  status: "draft",
};

const EventForm = ({
  initialValues = null,
  loading = false,
  mode = "create",

  venues = [],
  loadingVenues = false,

  onSubmit,
  onCancel,
  onCreateVenue,
}) => {
  const [form, setForm] = useState(defaultValues);

  /* =====================================================
     LOAD INITIAL VALUES
  ===================================================== */

  useEffect(() => {
    if (!initialValues) return;

    setForm({
      ...defaultValues,
      ...initialValues,

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

  /* =====================================================
     UPDATE HELPERS
  ===================================================== */

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
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

  /* =====================================================
     SUBMIT
  ===================================================== */

  const handleAction = (status) => {
    if (!onSubmit) return;

    onSubmit({
      ...form,
      status,
    });
  };

  return (
    <form
      className="event-form"
      onSubmit={(e) => e.preventDefault()}
    >
      {/* ===============================================
          BASIC INFORMATION
      =============================================== */}

      <BasicInfoSection
        data={form}
        onChange={updateField}
      />

      {/* ===============================================
          CLASSIFICATION
      =============================================== */}

      <ClassificationSection
        data={form}
        onChange={updateField}
      />

      {/* ===============================================
          SCHEDULE
      =============================================== */}

      <ScheduleSection
        data={form}
        onChange={updateField}
      />

      {/* ===============================================
          REGISTRATION
      =============================================== */}

      <RegistrationSection
        registration={form.registration}
        onChange={updateRegistration}
      />

      {/* ===============================================
          MEDIA
      =============================================== */}

      <MediaSection
        coverImage={form.coverImage}
        gallery={form.gallery}
        onCoverImageChange={updateCoverImage}
        onGalleryChange={updateGallery}
      />

      {/* ===============================================
          VENUE
      =============================================== */}

      <VenueSection
        value={form.venue}
        venues={venues}
        loading={loadingVenues}
        onChange={(venueId) =>
          updateField("venue", venueId)
        }
        onCreateVenue={onCreateVenue}
      />

      {/* ===============================================
          PUBLISH
      =============================================== */}

      <PublishSection
        mode={mode}
        loading={loading}
        onCancel={onCancel}
        onAction={handleAction}
      />
    </form>
  );
};

export default EventForm;