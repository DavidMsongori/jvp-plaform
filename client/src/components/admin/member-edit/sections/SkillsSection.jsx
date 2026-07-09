import "./Section.css";

function SkillsSection({

  formData,

  updateField,

  updateArrayField,

}) {

  const handleArrayChange = (

    field,

    value

  ) => {

    const values = value

      .split(",")

      .map((item) => item.trim())

      .filter(Boolean);

    updateArrayField(

      field,

      values

    );

  };

  return (

    <section className="edit-section">

      <div className="edit-section-header">

        <div>

          <h2>

            Skills & Interests

          </h2>

          <p>

            Update the member's skills, interests, languages and profile information.

          </p>

        </div>

      </div>

      <div className="form-grid">

        {/* Skills */}

        <div className="form-group full-width">

          <label>

            Skills

          </label>

          <textarea

            rows="3"

            value={

              (formData.skills || []).join(", ")

            }

            onChange={(e) =>

              handleArrayChange(

                "skills",

                e.target.value

              )

            }

            placeholder="Leadership, Public Speaking, Project Management"

          />

        </div>

        {/* Interests */}

        <div className="form-group full-width">

          <label>

            Interests

          </label>

          <textarea

            rows="3"

            value={

              (formData.interests || []).join(", ")

            }

            onChange={(e) =>

              handleArrayChange(

                "interests",

                e.target.value

              )

            }

            placeholder="Climate Action, Blue Economy, Entrepreneurship"

          />

        </div>

        {/* Languages */}

        <div className="form-group full-width">

          <label>

            Languages

          </label>

          <textarea

            rows="2"

            value={

              (formData.languages || []).join(", ")

            }

            onChange={(e) =>

              handleArrayChange(

                "languages",

                e.target.value

              )

            }

            placeholder="English, Kiswahili"

          />

        </div>

        {/* Availability */}

        <div className="form-group">

          <label>

            Availability

          </label>

          <select

            value={

              formData.availability || ""

            }

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

            <option value="Full Time">

              Full Time

            </option>

            <option value="Part Time">

              Part Time

            </option>

            <option value="Weekends">

              Weekends

            </option>

            <option value="Evenings">

              Evenings

            </option>

            <option value="Remote">

              Remote

            </option>

            <option value="On Call">

              On Call

            </option>

          </select>

        </div>

        {/* Volunteer Preference */}

        <div className="form-group">

          <label>

            Volunteer Preference

          </label>

          <select

            value={

              formData.volunteerPreference || ""

            }

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

            <option value="Community Service">

              Community Service

            </option>

            <option value="Training">

              Training

            </option>

            <option value="Environmental Activities">

              Environmental Activities

            </option>

            <option value="Mentorship">

              Mentorship

            </option>

            <option value="Administration">

              Administration

            </option>

            <option value="Any">

              Any Opportunity

            </option>

          </select>

        </div>

        {/* Biography */}

        <div className="form-group full-width">

          <label>

            Biography

          </label>

          <textarea

            rows="5"

            value={

              formData.bio || ""

            }

            onChange={(e) =>

              updateField(

                "bio",

                e.target.value

              )

            }

            placeholder="Short biography about the member..."

          />

        </div>

      </div>

    </section>

  );

}

export default SkillsSection;