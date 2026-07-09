import "./Profile.css";

/* =====================================================
   SKILLS INFORMATION
===================================================== */

function SkillsInformation({

  formData,

  updateField,

}) {

  return (

    <section className="profile-section">

      <div className="profile-section-header">

        <h2>

          Skills & Interests

        </h2>

        <p>

          Tell us what you do best and how you would like to contribute.

        </p>

      </div>

      <div className="profile-grid">

        {/* Skills */}

        <div className="form-group profile-full-width">

          <label>

            Skills

          </label>

          <textarea

            rows="3"

            placeholder="Separate skills with commas"

            value={formData.skills || ""}

            onChange={(e) =>

              updateField(

                "skills",

                e.target.value

              )

            }

          />

        </div>

        {/* Languages */}

        <div className="form-group profile-full-width">

          <label>

            Languages

          </label>

          <textarea

            rows="2"

            placeholder="Example: English, Kiswahili"

            value={formData.languages || ""}

            onChange={(e) =>

              updateField(

                "languages",

                e.target.value

              )

            }

          />

        </div>

        {/* Interests */}

        <div className="form-group profile-full-width">

          <label>

            Interests

          </label>

          <textarea

            rows="2"

            placeholder="Youth Leadership, Climate Action..."

            value={formData.interests || ""}

            onChange={(e) =>

              updateField(

                "interests",

                e.target.value

              )

            }

          />

        </div>

        {/* Availability */}

        <div className="form-group">

          <label>

            Availability

          </label>

          <select

            value={formData.availability || ""}

            onChange={(e) =>

              updateField(

                "availability",

                e.target.value

              )

            }

          >

            <option value="">

              Select Availability

            </option>

            <option>

              Full Time

            </option>

            <option>

              Part Time

            </option>

            <option>

              Weekends

            </option>

            <option>

              Occasionally

            </option>

          </select>

        </div>

        {/* Volunteer Preference */}

        <div className="form-group">

          <label>

            Volunteer Preference

          </label>

          <select

            value={formData.volunteerPreference || ""}

            onChange={(e) =>

              updateField(

                "volunteerPreference",

                e.target.value

              )

            }

          >

            <option value="">

              Select Preference

            </option>

            <option>

              Community Service

            </option>

            <option>

              Events

            </option>

            <option>

              Environment

            </option>

            <option>

              Advocacy

            </option>

            <option>

              Mentorship

            </option>

            <option>

              Entrepreneurship

            </option>

          </select>

        </div>

        {/* Biography */}

        <div className="form-group profile-full-width">

          <label>

            Biography

          </label>

          <textarea

            rows="5"

            placeholder="Tell us about yourself..."

            value={formData.bio || ""}

            onChange={(e) =>

              updateField(

                "bio",

                e.target.value

              )

            }

          />

        </div>

      </div>

    </section>

  );

}

export default SkillsInformation;