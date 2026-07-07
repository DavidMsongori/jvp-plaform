function LocationSection({

  formData,

  handleChange,

}) {

  return (

    <section className="profile-section">

      <h2>

        Location Information

      </h2>

      <div className="profile-grid">

        <div className="form-group">

          <label>

            County

          </label>

          <select

            name="county"

            value={formData.county}

            onChange={handleChange}

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

        <div className="form-group">

          <label>

            Constituency

          </label>

          <input

            type="text"

            name="constituency"

            value={formData.constituency}

            onChange={handleChange}

            placeholder="Enter Constituency"

          />

        </div>

        <div className="form-group">

          <label>

            Ward

          </label>

          <input

            type="text"

            name="ward"

            value={formData.ward}

            onChange={handleChange}

            placeholder="Enter Ward"

          />

        </div>

        <div className="form-group">

          <label>

            Village / Estate

          </label>

          <input

            type="text"

            name="village"

            value={formData.village}

            onChange={handleChange}

            placeholder="Enter Village or Estate"

          />

        </div>

      </div>

    </section>

  );

}

export default LocationSection;