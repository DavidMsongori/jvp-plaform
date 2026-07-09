import "./Section.css";

function PersonalSection({

  formData,

  updateField,

}) {

  return (

    <section className="edit-section">

      <div className="edit-section-header">

        <div>

          <h2>

            Personal Information

          </h2>

          <p>

            Update the member's personal details.

          </p>

        </div>

      </div>

      <div className="form-grid">

        {/* First Name */}

        <div className="form-group">

          <label>

            First Name

          </label>

          <input

            type="text"

            value={formData.firstName || ""}

            onChange={(e) =>

              updateField(

                "firstName",

                e.target.value

              )

            }

          />

        </div>

        {/* Middle Name */}

        <div className="form-group">

          <label>

            Middle Name

          </label>

          <input

            type="text"

            value={formData.middleName || ""}

            onChange={(e) =>

              updateField(

                "middleName",

                e.target.value

              )

            }

          />

        </div>

        {/* Last Name */}

        <div className="form-group">

          <label>

            Last Name

          </label>

          <input

            type="text"

            value={formData.lastName || ""}

            onChange={(e) =>

              updateField(

                "lastName",

                e.target.value

              )

            }

          />

        </div>

        {/* Gender */}

        <div className="form-group">

          <label>

            Gender

          </label>

          <select

            value={formData.gender || ""}

            onChange={(e) =>

              updateField(

                "gender",

                e.target.value

              )

            }

          >

            <option value="">

              Select Gender

            </option>

            <option value="Male">

              Male

            </option>

            <option value="Female">

              Female

            </option>

            <option value="Other">

              Other

            </option>

          </select>

        </div>

        {/* Date of Birth */}

        <div className="form-group">

          <label>

            Date of Birth

          </label>

          <input

            type="date"

            value={

              formData.dob

                ? formData.dob.substring(0, 10)

                : ""

            }

            onChange={(e) =>

              updateField(

                "dob",

                e.target.value

              )

            }

          />

        </div>

        {/* National ID */}

        <div className="form-group">

          <label>

            National ID

          </label>

          <input

            type="text"

            value={formData.nationalId || ""}

            onChange={(e) =>

              updateField(

                "nationalId",

                e.target.value

              )

            }

          />

        </div>

        {/* Phone */}

        <div className="form-group">

          <label>

            Phone Number

          </label>

          <input

            type="tel"

            value={formData.phone || ""}

            onChange={(e) =>

              updateField(

                "phone",

                e.target.value

              )

            }

          />

        </div>

        {/* Email */}

        <div className="form-group">

          <label>

            Email Address

          </label>

          <input

            type="email"

            value={formData.email || ""}

            onChange={(e) =>

              updateField(

                "email",

                e.target.value

              )

            }

          />

        </div>

      </div>

    </section>

  );

}

export default PersonalSection;