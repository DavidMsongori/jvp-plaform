import "./Profile.css";

/* =====================================================
   EMPLOYMENT INFORMATION
===================================================== */

function EmploymentInformation({

  formData,

  updateNestedField,

}) {

  const employment =

    formData.employment || {};

  return (

    <section className="profile-section">

      <div className="profile-section-header">

        <h2>

          Employment

        </h2>

        <p>

          Share your current employment or business information.

        </p>

      </div>

      <div className="profile-grid">

        {/* Employment Status */}

        <div className="form-group">

          <label>

            Employment Status

          </label>

          <select

            value={employment.status || ""}

            onChange={(e) =>

              updateNestedField(

                "employment",

                "status",

                e.target.value

              )

            }

          >

            <option value="">

              Select Status

            </option>

            <option>

              Employed

            </option>

            <option>

              Self Employed

            </option>

            <option>

              Student

            </option>

            <option>

              Unemployed

            </option>

            <option>

              Volunteer

            </option>

            <option>

              Retired

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

            value={employment.occupation || ""}

            onChange={(e) =>

              updateNestedField(

                "employment",

                "occupation",

                e.target.value

              )

            }

          />

        </div>

        {/* Employer */}

        <div className="form-group">

          <label>

            Employer / Business

          </label>

          <input

            type="text"

            value={employment.employer || ""}

            onChange={(e) =>

              updateNestedField(

                "employment",

                "employer",

                e.target.value

              )

            }

          />

        </div>

        {/* Work Location */}

        <div className="form-group">

          <label>

            Work Location

          </label>

          <input

            type="text"

            value={employment.workLocation || ""}

            onChange={(e) =>

              updateNestedField(

                "employment",

                "workLocation",

                e.target.value

              )

            }

          />

        </div>

      </div>

    </section>

  );

}

export default EmploymentInformation;