import "./Section.css";

function SocialSection({

  formData,

  updateField,

}) {

  return (

    <section className="edit-section">

      <div className="edit-section-header">

        <div>

          <h2>

            Social Media

          </h2>

          <p>

            Update the member's social media profiles and online presence.

          </p>

        </div>

      </div>

      <div className="form-grid">

        {/* Facebook */}

        <div className="form-group">

          <label>

            Facebook

          </label>

          <input

            type="url"

            value={formData.facebook || ""}

            onChange={(e) =>

              updateField(

                "facebook",

                e.target.value

              )

            }

            placeholder="https://facebook.com/username"

          />

        </div>

        {/* Instagram */}

        <div className="form-group">

          <label>

            Instagram

          </label>

          <input

            type="url"

            value={formData.instagram || ""}

            onChange={(e) =>

              updateField(

                "instagram",

                e.target.value

              )

            }

            placeholder="https://instagram.com/username"

          />

        </div>

        {/* LinkedIn */}

        <div className="form-group">

          <label>

            LinkedIn

          </label>

          <input

            type="url"

            value={formData.linkedin || ""}

            onChange={(e) =>

              updateField(

                "linkedin",

                e.target.value

              )

            }

            placeholder="https://linkedin.com/in/username"

          />

        </div>

        {/* X */}

        <div className="form-group">

          <label>

            X (Twitter)

          </label>

          <input

            type="url"

            value={formData.x || ""}

            onChange={(e) =>

              updateField(

                "x",

                e.target.value

              )

            }

            placeholder="https://x.com/username"

          />

        </div>

        {/* TikTok */}

        <div className="form-group">

          <label>

            TikTok

          </label>

          <input

            type="url"

            value={formData.tiktok || ""}

            onChange={(e) =>

              updateField(

                "tiktok",

                e.target.value

              )

            }

            placeholder="https://tiktok.com/@username"

          />

        </div>

        {/* Website */}

        <div className="form-group">

          <label>

            Personal Website

          </label>

          <input

            type="url"

            value={formData.website || ""}

            onChange={(e) =>

              updateField(

                "website",

                e.target.value

              )

            }

            placeholder="https://example.com"

          />

        </div>

      </div>

    </section>

  );

}

export default SocialSection;