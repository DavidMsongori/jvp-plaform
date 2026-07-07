function SocialSection({

  formData,

  handleChange,

}) {

  return (

    <section className="profile-section">

      <h2>

        Social Media

      </h2>

      <div className="profile-grid">

        <div className="form-group">

          <label>

            Facebook

          </label>

          <input

            type="url"

            name="social.facebook"

            value={formData.social.facebook}

            onChange={handleChange}

            placeholder="https://facebook.com/yourprofile"

          />

        </div>

        <div className="form-group">

          <label>

            Instagram

          </label>

          <input

            type="url"

            name="social.instagram"

            value={formData.social.instagram}

            onChange={handleChange}

            placeholder="https://instagram.com/yourprofile"

          />

        </div>

        <div className="form-group">

          <label>

            LinkedIn

          </label>

          <input

            type="url"

            name="social.linkedin"

            value={formData.social.linkedin}

            onChange={handleChange}

            placeholder="https://linkedin.com/in/yourprofile"

          />

        </div>

        <div className="form-group">

          <label>

            X (Twitter)

          </label>

          <input

            type="url"

            name="social.twitter"

            value={formData.social.twitter}

            onChange={handleChange}

            placeholder="https://x.com/yourprofile"

          />

        </div>

        <div className="form-group full-width">

          <label>

            TikTok

          </label>

          <input

            type="url"

            name="social.tiktok"

            value={formData.social.tiktok}

            onChange={handleChange}

            placeholder="https://tiktok.com/@yourprofile"

          />

        </div>

      </div>

    </section>

  );

}

export default SocialSection;