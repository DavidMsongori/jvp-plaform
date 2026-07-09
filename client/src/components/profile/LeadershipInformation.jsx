import "./Profile.css";

/* =====================================================
   LEADERSHIP INFORMATION
===================================================== */

function LeadershipInformation({

  formData,

  updateNestedField,

}) {

  const leadership =

    formData.leadership || {};

  return (

    <section className="profile-section">

      <div className="profile-section-header">

        <h2>

          Leadership Experience

        </h2>

        <p>

          Tell us about your leadership experience and positions held.

        </p>

      </div>

      <div className="profile-grid">

        {/* Position */}

        <div className="form-group">

          <label>

            Current Leadership Position

          </label>

          <input

            type="text"

            value={leadership.position || ""}

            onChange={(e) =>

              updateNestedField(

                "leadership",

                "position",

                e.target.value

              )

            }

          />

        </div>

        {/* Organization */}

        <div className="form-group">

          <label>

            Organization

          </label>

          <input

            type="text"

            value={leadership.organization || ""}

            onChange={(e) =>

              updateNestedField(

                "leadership",

                "organization",

                e.target.value

              )

            }

          />

        </div>

        {/* Start Year */}

        <div className="form-group">

          <label>

            Start Year

          </label>

          <input

            type="number"

            min="1950"

            max="2100"

            value={leadership.startYear || ""}

            onChange={(e) =>

              updateNestedField(

                "leadership",

                "startYear",

                e.target.value

              )

            }

          />

        </div>

        {/* End Year */}

        <div className="form-group">

          <label>

            End Year

          </label>

          <input

            type="number"

            min="1950"

            max="2100"

            value={leadership.endYear || ""}

            onChange={(e) =>

              updateNestedField(

                "leadership",

                "endYear",

                e.target.value

              )

            }

          />

        </div>

        {/* Description */}

        <div className="form-group profile-full-width">

          <label>

            Leadership Experience

          </label>

          <textarea

            rows="4"

            value={leadership.description || ""}

            onChange={(e) =>

              updateNestedField(

                "leadership",

                "description",

                e.target.value

              )

            }

          />

        </div>

      </div>

    </section>

  );

}

export default LeadershipInformation;