function SkillsSection({

  formData,

  handleChange,

}) {

  return (

    <section className="profile-section">

      <h2>

        Skills & Interests

      </h2>

      <div className="profile-grid">

        <div className="form-group full-width">

          <label>

            Professional Skills

          </label>

          <textarea

            rows="4"

            name="skills"

            value={formData.skills.join(", ")}

            onChange={handleChange}

            placeholder="Leadership, Public Speaking, Project Management, Graphic Design..."

          />

          <small>

            Separate each skill using a comma.

          </small>

        </div>

        <div className="form-group">

          <label>

            Languages Spoken

          </label>

          <input

            type="text"

            name="languages"

            value={formData.languages.join(", ")}

            onChange={handleChange}

            placeholder="English, Kiswahili, Giryama..."

          />

          <small>

            Separate languages using commas.

          </small>

        </div>

        <div className="form-group">

          <label>

            Areas of Interest

          </label>

          <input

            type="text"

            name="interests"

            value={formData.interests.join(", ")}

            onChange={handleChange}

            placeholder="Climate Action, Entrepreneurship, Governance..."

          />

          <small>

            Separate interests using commas.

          </small>

        </div>

        <div className="form-group full-width">

          <label>

            Biography

          </label>

          <textarea

            rows="6"

            name="bio"

            value={formData.bio}

            onChange={handleChange}

            placeholder="Tell us about yourself, your experience and aspirations..."

          />

        </div>

      </div>

    </section>

  );

}

export default SkillsSection;