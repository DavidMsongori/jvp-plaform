import "./Profile.css";

/* =====================================================
   SOCIAL INFORMATION
===================================================== */

function SocialInformation({

  formData,

  updateNestedField,

}) {

  const social =

    formData.social || {};

  return (

    <section className="profile-section">

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="profile-section-header">

        <h2>

          Social Media

        </h2>

        <p>

          Add your social media and professional networking profiles.

        </p>

      </div>

      {/* ======================================
          FORM
      ====================================== */}

      <div className="profile-grid">

        {/* Facebook */}

        <div className="form-group">

          <label>

            Facebook

          </label>

          <input

            type="url"

            placeholder="https://facebook.com/username"

            value={social.facebook || ""}

            onChange={(e) =>

              updateNestedField(

                "social",

                "facebook",

                e.target.value

              )

            }

          />

        </div>

        {/* Instagram */}

        <div className="form-group">

          <label>

            Instagram

          </label>

          <input

            type="url"

            placeholder="https://instagram.com/username"

            value={social.instagram || ""}

            onChange={(e) =>

              updateNestedField(

                "social",

                "instagram",

                e.target.value

              )

            }

          />

        </div>

        {/* X */}

        <div className="form-group">

          <label>

            X (Twitter)

          </label>

          <input

            type="url"

            placeholder="https://x.com/username"

            value={social.twitter || ""}

            onChange={(e) =>

              updateNestedField(

                "social",

                "twitter",

                e.target.value

              )

            }

          />

        </div>

        {/* LinkedIn */}

        <div className="form-group">

          <label>

            LinkedIn

          </label>

          <input

            type="url"

            placeholder="https://linkedin.com/in/username"

            value={social.linkedin || ""}

            onChange={(e) =>

              updateNestedField(

                "social",

                "linkedin",

                e.target.value

              )

            }

          />

        </div>

        {/* TikTok */}

        <div className="form-group">

          <label>

            TikTok

          </label>

          <input

            type="url"

            placeholder="https://tiktok.com/@username"

            value={social.tiktok || ""}

            onChange={(e) =>

              updateNestedField(

                "social",

                "tiktok",

                e.target.value

              )

            }

          />

        </div>

        {/* YouTube */}

        <div className="form-group">

          <label>

            YouTube

          </label>

          <input

            type="url"

            placeholder="https://youtube.com/@username"

            value={social.youtube || ""}

            onChange={(e) =>

              updateNestedField(

                "social",

                "youtube",

                e.target.value

              )

            }

          />

        </div>

        {/* Website */}

        <div className="form-group profile-full-width">

          <label>

            Personal Website

          </label>

          <input

            type="url"

            placeholder="https://example.com"

            value={social.website || ""}

            onChange={(e) =>

              updateNestedField(

                "social",

                "website",

                e.target.value

              )

            }

          />

        </div>

      </div>

    </section>

  );

}

export default SocialInformation;