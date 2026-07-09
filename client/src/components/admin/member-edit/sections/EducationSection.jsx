import "./Section.css";

function EducationSection({

  formData,

  updateField,

}) {

  return (

    <section className="edit-section">

      <div className="edit-section-header">

        <div>

          <h2>

            Education Information

          </h2>

          <p>

            Update the member's education and academic qualifications.

          </p>

        </div>

      </div>

      <div className="form-grid">

        {/* Institution */}

        <div className="form-group">

          <label>

            Institution

          </label>

          <input

            type="text"

            value={formData.institution || ""}

            onChange={(e) =>

              updateField(

                "institution",

                e.target.value

              )

            }

            placeholder="e.g. Pwani University"

          />

        </div>

        {/* Course */}

        <div className="form-group">

          <label>

            Course

          </label>

          <input

            type="text"

            value={formData.course || ""}

            onChange={(e) =>

              updateField(

                "course",

                e.target.value

              )

            }

            placeholder="e.g. Agricultural Science"

          />

        </div>

        {/* Education Level */}

        <div className="form-group">

          <label>

            Education Level

          </label>

          <select

            value={formData.level || ""}

            onChange={(e) =>

              updateField(

                "level",

                e.target.value

              )

            }

          >

            <option value="">

              Select Level

            </option>

            <option value="Primary">

              Primary

            </option>

            <option value="Secondary">

              Secondary

            </option>

            <option value="Certificate">

              Certificate

            </option>

            <option value="Diploma">

              Diploma

            </option>

            <option value="Higher Diploma">

              Higher Diploma

            </option>

            <option value="Bachelor's Degree">

              Bachelor's Degree

            </option>

            <option value="Postgraduate Diploma">

              Postgraduate Diploma

            </option>

            <option value="Master's Degree">

              Master's Degree

            </option>

            <option value="Doctorate (PhD)">

              Doctorate (PhD)

            </option>

            <option value="Other">

              Other

            </option>

          </select>

        </div>

        {/* Graduation Year */}

        <div className="form-group">

          <label>

            Graduation Year

          </label>

          <input

            type="number"

            min="1950"

            max="2100"

            value={formData.graduationYear || ""}

            onChange={(e) =>

              updateField(

                "graduationYear",

                e.target.value

              )

            }

            placeholder="2026"

          />

        </div>

        {/* Student Registration Number */}

        <div className="form-group full-width">

          <label>

            Student Registration Number

          </label>

          <input

            type="text"

            value={

              formData.studentRegistrationNumber ||

              ""

            }

            onChange={(e) =>

              updateField(

                "studentRegistrationNumber",

                e.target.value

              )

            }

            placeholder="Registration Number"

          />

        </div>

      </div>

    </section>

  );

}

export default EducationSection;