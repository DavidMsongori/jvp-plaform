import { MapPin, PlusCircle } from "lucide-react";

const VenueSection = ({
  value,
  venues = [],
  loading = false,
  onChange,
  onCreateVenue,
}) => {
  return (
    <section className="event-section">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="section-header">

        <div className="section-title">

          <MapPin size={20} />

          <div>

            <h2>Venue</h2>

            <p>
              Select the venue where this
              event will take place.
            </p>

          </div>

        </div>

        {onCreateVenue && (
          <button
            type="button"
            className="btn btn-outline"
            onClick={onCreateVenue}
          >
            <PlusCircle size={16} />
            New Venue
          </button>
        )}

      </div>

      {/* ==========================================
          VENUE SELECT
      ========================================== */}

      <div className="form-group">

        <label htmlFor="venue">

          Venue

        </label>

        <select
          id="venue"
          value={value || ""}
          disabled={loading}
          onChange={(e) =>
            onChange(e.target.value)
          }
        >

          <option value="">

            {loading
              ? "Loading venues..."
              : "Select a venue"}

          </option>

          {venues.map((venue) => (

            <option
              key={venue._id}
              value={venue._id}
            >
              {venue.name}
              {venue.city
                ? ` • ${venue.city}`
                : ""}
              {venue.county
                ? `, ${venue.county}`
                : ""}
            </option>

          ))}

        </select>

      </div>

      {/* ==========================================
          EMPTY STATE
      ========================================== */}

      {!loading &&
        venues.length === 0 && (

          <div className="empty-state">

            <MapPin size={42} />

            <h4>
              No venues available
            </h4>

            <p>
              Create your first venue
              before creating events.
            </p>

            {onCreateVenue && (

              <button
                type="button"
                className="btn btn-primary"
                onClick={onCreateVenue}
              >
                <PlusCircle size={18} />

                Create Venue

              </button>

            )}

          </div>

        )}

      {/* ==========================================
          SELECTED VENUE
      ========================================== */}

      {!loading &&
        value &&
        venues.length > 0 && (() => {

          const selectedVenue =
            venues.find(
              (v) => v._id === value
            );

          if (!selectedVenue)
            return null;

          return (

            <div className="selected-venue-card">

              <h4>

                {selectedVenue.name}

              </h4>

              <p>

                {selectedVenue.address}

              </p>

              <p>

                {selectedVenue.city}
                {selectedVenue.city &&
                selectedVenue.county
                  ? ", "
                  : ""}
                {
                  selectedVenue.county
                }

              </p>

              {selectedVenue.capacity && (

                <p>

                  Capacity:{" "}
                  {
                    selectedVenue.capacity
                  }

                </p>

              )}

            </div>

          );

        })()}

    </section>
  );
};

export default VenueSection;