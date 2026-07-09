import "./Section.css";

function EmploymentSection({

  formData,

  updateField,

}) {

  return (

    <section className="edit-section">

      <div className="edit-section-header">

        <div>

          <h2>

            Employment Information

          </h2>

          <p>

            Update the member's employment, profession and work experience.

          </p>

        </div>

      </div>

      <div className="form-grid">

        {/* Employment Status */}

        <div className="form-group">

          <label>

            Employment Status

          </label>

          <select

            value={formData.employmentStatus || ""}

            onChange={(e) =>

              updateField(

                "employmentStatus",

                e.target.value

              )

            }

          >

            <option value="">

              Select Employment Status

            </option>

            <option value="Employed">

              Employed

            </option>

            <option value="Self Employed">

              Self Employed

            </option>

            <option value="Business Owner">

              Business Owner

            </option>

            <option value="Student">

              Student

            </option>

            <option value="Unemployed">

              Unemployed

            </option>

            <option value="Volunteer">

              Volunteer

            </option>

            <option value="Intern">

              Intern

            </option>

            <option value="Retired">

              Retired

            </option>

            <option value="Other">

              Other

            </option>

          </select>

        </div>

        {/* Occupation */}

        <div className="form-group">

          <label>

            Occupation

          </label>

          <input

            type="text"

            value={formData.occupation || ""}

            onChange={(e) =>

              updateField(

                "occupation",

                e.target.value

              )

            }

            placeholder="Occupation"

          />

        </div>

        {/* Employer */}

        <div className="form-group">

          <label>

            Employer

          </label>

          <input

            type="text"

            value={formData.employer || ""}

            onChange={(e) =>

              updateField(

                "employer",

                e.target.value

              )

            }

            placeholder="Employer"

          />

        </div>

        {/* Business Name */}

        <div className="form-group">

          <label>

            Business Name

          </label>

          <input

            type="text"

            value={formData.businessName || ""}

            onChange={(e) =>

              updateField(

                "businessName",

                e.target.value

              )

            }

            placeholder="Business Name"

          />

        </div>

        {/* Years of Experience */}

        <div className="form-group">

          <label>

            Years of Experience

          </label>

          <input

            type="number"

            min="0"

            max="80"

            value={formData.yearsExperience || ""}

            onChange={(e) =>

              updateField(

                "yearsExperience",

                e.target.value

              )

            }

            placeholder="Years"

          />

        </div>

        {/* Professional Bio */}

        <div className="form-group full-width">

          <label>

            Professional Background

          </label>

          <textarea

            rows="4"

            value={

              formData.professionalBackground || ""

            }

            onChange={(e) =>

              updateField(

                "professionalBackground",

                e.target.value

              )

            }

            placeholder="Brief summary of the member's professional experience..."

          />

        </div>

      </div>

    </section>

  );

}

export default EmploymentSection;