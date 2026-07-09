import "./Section.css";

function LeadershipSection({

  formData,

  updateField,

}) {

  return (

    <section className="edit-section">

      <div className="edit-section-header">

        <div>

          <h2>

            Leadership Information

          </h2>

          <p>

            Update the member's leadership experience and responsibilities.

          </p>

        </div>

      </div>

      <div className="form-grid">

        {/* Leadership Experience */}

        <div className="form-group">

          <label>

            Leadership Experience

          </label>

          <select

            value={formData.leadershipExperience || ""}

            onChange={(e) =>

              updateField(

                "leadershipExperience",

                e.target.value

              )

            }

          >

            <option value="">

              Select

            </option>

            <option value="Yes">

              Yes

            </option>

            <option value="No">

              No

            </option>

          </select>

        </div>

        {/* Current Position */}

        <div className="form-group">

          <label>

            Leadership Position

          </label>

          <input

            type="text"

            value={

              formData.leadershipPosition || ""

            }

            onChange={(e) =>

              updateField(

                "leadershipPosition",

                e.target.value

              )

            }

            placeholder="Chairperson"

          />

        </div>

        {/* Organization */}

        <div className="form-group">

          <label>

            Organization

          </label>

          <input

            type="text"

            value={

              formData.leadershipOrganization || ""

            }

            onChange={(e) =>

              updateField(

                "leadershipOrganization",

                e.target.value

              )

            }

            placeholder="JVP"

          />

        </div>

        {/* Years */}

        <div className="form-group">

          <label>

            Years Served

          </label>

          <input

            type="number"

            min="0"

            max="80"

            value={

              formData.leadershipYears || ""

            }

            onChange={(e) =>

              updateField(

                "leadershipYears",

                e.target.value

              )

            }

          />

        </div>

        {/* Status */}

        <div className="form-group">

          <label>

            Leadership Status

          </label>

          <select

            value={

              formData.currentLeadershipStatus || ""

            }

            onChange={(e) =>

              updateField(

                "currentLeadershipStatus",

                e.target.value

              )

            }

          >

            <option value="">

              Select Status

            </option>

            <option value="Active">

              Active

            </option>

            <option value="Former">

              Former

            </option>

            <option value="Acting">

              Acting

            </option>

            <option value="Interim">

              Interim

            </option>

          </select>

        </div>

        {/* Description */}

        <div className="form-group full-width">

          <label>

            Leadership Description

          </label>

          <textarea

            rows="5"

            value={

              formData.leadershipDescription || ""

            }

            onChange={(e) =>

              updateField(

                "leadershipDescription",

                e.target.value

              )

            }

            placeholder="Describe the member's leadership roles, achievements and responsibilities..."

          />

        </div>

      </div>

    </section>

  );

}

export default LeadershipSection;