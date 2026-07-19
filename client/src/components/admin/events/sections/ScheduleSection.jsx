import { CalendarDays, Clock } from "lucide-react";

const timezones = [
  {
    value: "Africa/Nairobi",
    label: "Africa/Nairobi (EAT)",
  },
  {
    value: "Africa/Dar_es_Salaam",
    label: "Africa/Dar es Salaam (EAT)",
  },
  {
    value: "UTC",
    label: "UTC",
  },
];

const ScheduleSection = ({
  data,
  onChange,
}) => {
  return (
    <section className="event-section">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="section-header">

        <div className="section-title">

          <CalendarDays size={20} />

          <div>

            <h2>Schedule</h2>

            <p>
              Specify when the event starts,
              ends and the timezone it will
              follow.
            </p>

          </div>

        </div>

      </div>

      {/* ==========================================
          DATE & TIME
      ========================================== */}

      <div className="form-grid">

        <div className="form-group">

          <label>
            Start Date & Time
            <span className="required">
              *
            </span>
          </label>

          <input
            type="datetime-local"
            value={data.startDate}
            onChange={(e) =>
              onChange(
                "startDate",
                e.target.value
              )
            }
            required
          />

        </div>

        <div className="form-group">

          <label>
            End Date & Time
            <span className="required">
              *
            </span>
          </label>

          <input
            type="datetime-local"
            value={data.endDate}
            onChange={(e) =>
              onChange(
                "endDate",
                e.target.value
              )
            }
            required
          />

        </div>

      </div>

      {/* ==========================================
          TIMEZONE
      ========================================== */}

      <div className="form-group">

        <label>

          <Clock size={16} />

          Timezone

        </label>

        <select
          value={data.timezone}
          onChange={(e) =>
            onChange(
              "timezone",
              e.target.value
            )
          }
        >
          {timezones.map((timezone) => (
            <option
              key={timezone.value}
              value={timezone.value}
            >
              {timezone.label}
            </option>
          ))}
        </select>

        <small>
          All event dates and times will be
          displayed using this timezone.
        </small>

      </div>

      {/* ==========================================
          INFORMATION
      ========================================== */}

      <div className="info-card">

        <CalendarDays size={18} />

        <div>

          <strong>
            Registration Schedule
          </strong>

          <p>
            Registration opening and closing
            dates are configured in the
            <strong> Registration</strong>
            {" "}section below.
          </p>

        </div>

      </div>

    </section>
  );
};

export default ScheduleSection;