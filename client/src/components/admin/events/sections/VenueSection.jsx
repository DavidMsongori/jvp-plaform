import { MapPin, Globe } from "lucide-react";

const VenueSection = ({
  venue,
  virtualLink,
  eventType,
  onVenueChange,
  onVirtualLinkChange,
}) => {
  const updateField = (field, value) => {
    onVenueChange({
      ...venue,
      [field]: value,
    });
  };

  return (
    <section className="event-section">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="section-header">

        <div className="section-title">
          <MapPin size={20} />

          <div>
            <h2>Venue Information</h2>

            <p>
              Enter where this event will
              take place.
            </p>
          </div>
        </div>

      </div>

      {/* ==========================================
          PHYSICAL EVENT
      ========================================== */}

      {eventType === "physical" && (
        <>

          <div className="form-grid">

            <div className="form-group">
              <label>
                Venue Name
              </label>

              <input
                type="text"
                value={venue.name}
                placeholder="e.g. KICC"
                onChange={(e) =>
                  updateField(
                    "name",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="form-group">
              <label>
                County
              </label>

              <input
                type="text"
                value={venue.county}
                placeholder="e.g. Nairobi"
                onChange={(e) =>
                  updateField(
                    "county",
                    e.target.value
                  )
                }
              />
            </div>

          </div>

          <div className="form-grid">

            <div className="form-group">
              <label>
                City / Town
              </label>

              <input
                type="text"
                value={venue.city}
                placeholder="e.g. Upper Hill"
                onChange={(e) =>
                  updateField(
                    "city",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="form-group">
              <label>
                Google Maps Link
              </label>

              <input
                type="url"
                value={
                  venue.googleMapsLink
                }
                placeholder="https://maps.google..."
                onChange={(e) =>
                  updateField(
                    "googleMapsLink",
                    e.target.value
                  )
                }
              />
            </div>

          </div>

          <div className="form-group">
            <label>
              Physical Address
            </label>

            <textarea
              rows={3}
              value={venue.address}
              placeholder="Enter the venue address"
              onChange={(e) =>
                updateField(
                  "address",
                  e.target.value
                )
              }
            />
          </div>

        </>
      )}

      {/* ==========================================
          VIRTUAL EVENT
      ========================================== */}

      {eventType === "virtual" && (
        <div className="form-group">

          <label>
            <Globe size={16} />
            Virtual Meeting Link
          </label>

          <input
            type="url"
            value={virtualLink}
            placeholder="https://zoom.us/..."
            onChange={(e) =>
              onVirtualLinkChange(
                e.target.value
              )
            }
          />

        </div>
      )}

      {/* ==========================================
          HYBRID EVENT
      ========================================== */}

      {eventType === "hybrid" && (
        <>

          <div className="form-grid">

            <div className="form-group">
              <label>
                Venue Name
              </label>

              <input
                type="text"
                value={venue.name}
                onChange={(e) =>
                  updateField(
                    "name",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="form-group">
              <label>
                County
              </label>

              <input
                type="text"
                value={venue.county}
                onChange={(e) =>
                  updateField(
                    "county",
                    e.target.value
                  )
                }
              />
            </div>

          </div>

          <div className="form-group">

            <label>
              Physical Address
            </label>

            <textarea
              rows={3}
              value={venue.address}
              onChange={(e) =>
                updateField(
                  "address",
                  e.target.value
                )
              }
            />

          </div>

          <div className="form-group">

            <label>
              <Globe size={16} />
              Virtual Meeting Link
            </label>

            <input
              type="url"
              value={virtualLink}
              placeholder="https://zoom.us/..."
              onChange={(e) =>
                onVirtualLinkChange(
                  e.target.value
                )
              }
            />

          </div>

        </>
      )}

    </section>
  );
};

export default VenueSection;