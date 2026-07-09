import "./Profile.css";

/* =====================================================
   LOCATION INFORMATION
===================================================== */

function LocationInformation({

  formData,

  updateNestedField,

}) {

  const location =

    formData.location || {};

  return (

    <section className="profile-section">

      <div className="profile-section-header">

        <h2>

          Location Information

        </h2>

        <p>

          Tell us where you currently live.

        </p>

      </div>

      <div className="profile-grid">

        {/* County */}

        <div className="form-group">

          <label>

            County

          </label>

          <select

            value={location.county || ""}

            onChange={(e) =>

              updateNestedField(

                "location",

                "county",

                e.target.value

              )

            }

          >

            <option value="">

              Select County

            </option>

            <option>

              Mombasa

            </option>

            <option>

              Kwale

            </option>

            <option>

              Kilifi

            </option>

            <option>

              Tana River

            </option>

            <option>

              Lamu

            </option>

            <option>

              Taita Taveta

            </option>

          </select>

        </div>

        {/* Constituency */}

        <div className="form-group">

          <label>

            Constituency

          </label>

          <input

            type="text"

            value={

              location.constituency ||

              ""

            }

            onChange={(e) =>

              updateNestedField(

                "location",

                "constituency",

                e.target.value

              )

            }

          />

        </div>

        {/* Ward */}

        <div className="form-group">

          <label>

            Ward

          </label>

          <input

            type="text"

            value={

              location.ward ||

              ""

            }

            onChange={(e) =>

              updateNestedField(

                "location",

                "ward",

                e.target.value

              )

            }

          />

        </div>

      </div>

    </section>

  );

}

export default LocationInformation;