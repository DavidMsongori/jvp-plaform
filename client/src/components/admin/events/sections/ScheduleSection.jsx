import { CalendarDays } from "lucide-react";

const ScheduleSection = ({
  data,
  onChange,
}) => {
  return (
    <section className="form-section">

      <div className="section-header">

        <CalendarDays size={20} />

        <div>

          <h2>Schedule</h2>

          <p>
            Define when the event takes place and when registration closes.
          </p>

        </div>

      </div>

      <div className="form-grid">

        <div className="form-group">

          <label>Start Date *</label>

          <input
            type="datetime-local"
            value={data.startDate || ""}
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

          <label>End Date *</label>

          <input
            type="datetime-local"
            value={data.endDate || ""}
            onChange={(e) =>
              onChange(
                "endDate",
                e.target.value
              )
            }
            required
          />

        </div>

        <div className="form-group">

          <label>
            Registration Opens
          </label>

          <input
            type="datetime-local"
            value={
              data.registrationStart ||
              ""
            }
            onChange={(e) =>
              onChange(
                "registrationStart",
                e.target.value
              )
            }
          />

        </div>

        <div className="form-group">

          <label>
            Registration Closes
          </label>

          <input
            type="datetime-local"
            value={
              data.registrationDeadline ||
              ""
            }
            onChange={(e) =>
              onChange(
                "registrationDeadline",
                e.target.value
              )
            }
          />

        </div>

        <div className="form-group full-width">

          <label>Timezone</label>

          <select
            value={
              data.timezone ||
              "Africa/Nairobi"
            }
            onChange={(e) =>
              onChange(
                "timezone",
                e.target.value
              )
            }
          >
            <option value="Africa/Nairobi">
              Africa/Nairobi (EAT)
            </option>

            <option value="UTC">
              UTC
            </option>

            <option value="Africa/Dar_es_Salaam">
              Africa/Dar es Salaam
            </option>

          </select>

        </div>

      </div>

    </section>
  );
};

export default ScheduleSection;