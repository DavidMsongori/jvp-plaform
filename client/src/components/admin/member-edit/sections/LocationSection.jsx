import "./Section.css";

function LocationSection({

  formData,

  updateField,

}) {

  return (

    <section className="edit-section">

      <div className="edit-section-header">

        <div>

          <h2>

            Location Information

          </h2>

          <p>

            Update the member's location and residence details.

          </p>

        </div>

      </div>

      <div className="form-grid">

        {/* County */}

        <div className="form-group">

          <label>

            County

          </label>

          <select

            value={formData.county || ""}

            onChange={(e) =>

              updateField(

                "county",

                e.target.value

              )

            }

          >

            <option value="">

              Select County

            </option>

            <option value="Mombasa">

              Mombasa

            </option>

            <option value="Kwale">

              Kwale

            </option>

            <option value="Kilifi">

              Kilifi

            </option>

            <option value="Tana River">

              Tana River

            </option>

            <option value="Lamu">

              Lamu

            </option>

            <option value="Taita Taveta">

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

            value={formData.constituency || ""}

            onChange={(e) =>

              updateField(

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

            value={formData.ward || ""}

            onChange={(e) =>

              updateField(

                "ward",

                e.target.value

              )

            }

          />

        </div>

        {/* Village */}

        <div className="form-group">

          <label>

            Village / Estate

          </label>

          <input

            type="text"

            value={formData.village || ""}

            onChange={(e) =>

              updateField(

                "village",

                e.target.value

              )

            }

          />

        </div>

        {/* Physical Address */}

        <div className="form-group full-width">

          <label>

            Physical Address

          </label>

          <textarea

            rows="4"

            value={formData.address || ""}

            onChange={(e) =>

              updateField(

                "address",

                e.target.value

              )

            }

          />

        </div>

      </div>

    </section>

  );

}

export default LocationSection;