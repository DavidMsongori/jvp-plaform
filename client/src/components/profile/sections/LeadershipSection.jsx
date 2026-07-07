function LeadershipSection({

  formData,

  handleChange,

}) {

  return (

    <section className="profile-section">

      <h2>

        Leadership Experience

      </h2>

      <div className="profile-grid">

        <div className="form-group full-width">

          <label>

            Have you held any leadership position?

          </label>

          <select

            name="leadership.hasExperience"

            value={formData.leadership.hasExperience ? "Yes" : "No"}

            onChange={(e) =>

              handleChange({

                target: {

                  name: "leadership.hasExperience",

                  value: e.target.value === "Yes",

                },

              })

            }

          >

            <option value="No">

              No

            </option>

            <option value="Yes">

              Yes

            </option>

          </select>

        </div>

        <div className="form-group">

          <label>

            Organization

          </label>

          <input

            type="text"

            name="leadership.organization"

            value={formData.leadership.organization}

            onChange={handleChange}

            placeholder="Organization"

          />

        </div>

        <div className="form-group">

          <label>

            Position Held

          </label>

          <input

            type="text"

            name="leadership.position"

            value={formData.leadership.position}

            onChange={handleChange}

            placeholder="Chairperson, Secretary..."

          />

        </div>

        <div className="form-group">

          <label>

            Start Year

          </label>

          <input

            type="number"

            name="leadership.startYear"

            value={formData.leadership.startYear}

            onChange={handleChange}

            placeholder="2024"

          />

        </div>

        <div className="form-group">

          <label>

            End Year

          </label>

          <input

            type="number"

            name="leadership.endYear"

            value={formData.leadership.endYear}

            onChange={handleChange}

            placeholder="2026"

          />

        </div>

        <div className="form-group full-width">

          <label>

            Leadership Achievements

          </label>

          <textarea

            rows="5"

            name="leadership.achievements"

            value={formData.leadership.achievements}

            onChange={handleChange}

            placeholder="Describe your leadership achievements and impact..."

          />

        </div>

      </div>

    </section>

  );

}

export default LeadershipSection;