import "./Profile.css";

/* =====================================================
   EDUCATION INFORMATION
===================================================== */

function EducationInformation({

  formData,

  updateNestedField,

}) {

  const education =

    formData.education || {};

  return (

    <section className="profile-section">

      <div className="profile-section-header">

        <h2>

          Education

        </h2>

        <p>

          Tell us about your education and qualifications.

        </p>

      </div>

      <div className="profile-grid">

        {/* Highest Level */}

        <div className="form-group">

          <label>

            Highest Education Level

          </label>

          <select

            value={education.level || ""}

            onChange={(e) =>

              updateNestedField(

                "education",

                "level",

                e.target.value

              )

            }

          >

            <option value="">

              Select Level

            </option>

            <option>

              Primary

            </option>

            <option>

              Secondary

            </option>

            <option>

              Certificate

            </option>

            <option>

              Diploma

            </option>

            <option>

              Higher Diploma

            </option>

            <option>

              Bachelor's Degree

            </option>

            <option>

              Master's Degree

            </option>

            <option>

              Doctorate (PhD)

            </option>

            <option>

              Other

            </option>

          </select>

        </div>

        {/* Institution */}

        <div className="form-group">

          <label>

            Institution

          </label>

          <input

            type="text"

            value={education.institution || ""}

            onChange={(e) =>

              updateNestedField(

                "education",

                "institution",

                e.target.value

              )

            }

          />

        </div>

        {/* Course */}

        <div className="form-group">

          <label>

            Course / Programme

          </label>

          <input

            type="text"

            value={education.course || ""}

            onChange={(e) =>

              updateNestedField(

                "education",

                "course",

                e.target.value

              )

            }

          />

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

            value={education.graduationYear || ""}

            onChange={(e) =>

              updateNestedField(

                "education",

                "graduationYear",

                e.target.value

              )

            }

          />

        </div>

      </div>

    </section>

  );

}

export default EducationInformation;