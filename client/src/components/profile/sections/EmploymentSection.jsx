function EmploymentSection({

  formData,

  handleChange,

}) {

  return (

    <section className="profile-section">

      <h2>

        Employment Information

      </h2>

      <div className="profile-grid">

        <div className="form-group">

          <label>

            Employment Status

          </label>

          <select

            name="employment.status"

            value={formData.employment.status}

            onChange={handleChange}

          >

            <option value="">

              Select Status

            </option>

            <option value="Student">

              Student

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

            <option value="Volunteer">

              Volunteer

            </option>

            <option value="Intern">

              Intern

            </option>

            <option value="Unemployed">

              Unemployed

            </option>

          </select>

        </div>

        <div className="form-group">

          <label>

            Occupation

          </label>

          <input

            type="text"

            name="employment.occupation"

            value={formData.employment.occupation}

            onChange={handleChange}

            placeholder="Occupation"

          />

        </div>

        <div className="form-group">

          <label>

            Employer / Organization

          </label>

          <input

            type="text"

            name="employment.employer"

            value={formData.employment.employer}

            onChange={handleChange}

            placeholder="Employer"

          />

        </div>

        <div className="form-group">

          <label>

            Business Name

          </label>

          <input

            type="text"

            name="employment.businessName"

            value={formData.employment.businessName}

            onChange={handleChange}

            placeholder="Business Name"

          />

        </div>

        <div className="form-group">

          <label>

            Industry / Sector

          </label>

          <input

            type="text"

            name="employment.industry"

            value={formData.employment.industry}

            onChange={handleChange}

            placeholder="Agriculture, ICT, Tourism..."

          />

        </div>

        <div className="form-group">

          <label>

            Years of Experience

          </label>

          <input

            type="number"

            name="employment.experienceYears"

            value={formData.employment.experienceYears}

            onChange={handleChange}

            placeholder="0"

            min="0"

          />

        </div>

      </div>

    </section>

  );

}

export default EmploymentSection;