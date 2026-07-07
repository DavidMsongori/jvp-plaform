function EducationSection({

  formData,

  handleChange,

}) {

  return (

    <section className="profile-section">

      <h2>

        Education Information

      </h2>

      <div className="profile-grid">

        <div className="form-group">

          <label>

            Highest Education Level

          </label>

          <select

            name="education.level"

            value={formData.education.level}

            onChange={handleChange}

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

            <option value="Degree">

              Degree

            </option>

            <option value="Masters">

              Masters

            </option>

            <option value="PhD">

              PhD

            </option>

          </select>

        </div>

        <div className="form-group">

          <label>

            Institution

          </label>

          <input

            type="text"

            name="education.institution"

            value={formData.education.institution}

            onChange={handleChange}

            placeholder="Institution Name"

          />

        </div>

        <div className="form-group">

          <label>

            Course / Programme

          </label>

          <input

            type="text"

            name="education.course"

            value={formData.education.course}

            onChange={handleChange}

            placeholder="Course"

          />

        </div>

        <div className="form-group">

          <label>

            Registration Number

          </label>

          <input

            type="text"

            name="education.registrationNumber"

            value={formData.education.registrationNumber}

            onChange={handleChange}

            placeholder="Registration Number"

          />

        </div>

        <div className="form-group">

          <label>

            Graduation Year

          </label>

          <input

            type="number"

            name="education.graduationYear"

            value={formData.education.graduationYear}

            onChange={handleChange}

            placeholder="2026"

          />

        </div>

        <div className="form-group">

          <label>

            Current Status

          </label>

          <select

            name="education.status"

            value={formData.education.status}

            onChange={handleChange}

          >

            <option value="">

              Select Status

            </option>

            <option value="Studying">

              Currently Studying

            </option>

            <option value="Graduated">

              Graduated

            </option>

            <option value="Deferred">

              Deferred

            </option>

            <option value="Dropped">

              Dropped Out

            </option>

          </select>

        </div>

      </div>

    </section>

  );

}

export default EducationSection;