import "./Section.css";

function SecuritySection({

  formData,

  updateField,

}) {

  return (

    <section className="edit-section">

      <div className="edit-section-header">

        <div>

          <h2>

            Security & Account Controls

          </h2>

          <p>

            Manage account access and administrative security settings.

          </p>

        </div>

      </div>

      <div className="form-grid">

        {/* Account Locked */}

        <div className="form-group">

          <label>

            Account Locked

          </label>

          <select

            value={String(formData.accountLocked ?? false)}

            onChange={(e) =>

              updateField(

                "accountLocked",

                e.target.value === "true"

              )

            }

          >

            <option value="false">

              No

            </option>

            <option value="true">

              Yes

            </option>

          </select>

        </div>

        {/* Account Suspended */}

        <div className="form-group">

          <label>

            Account Suspended

          </label>

          <select

            value={String(formData.accountSuspended ?? false)}

            onChange={(e) =>

              updateField(

                "accountSuspended",

                e.target.value === "true"

              )

            }

          >

            <option value="false">

              No

            </option>

            <option value="true">

              Yes

            </option>

          </select>

        </div>

        {/* Force Password Reset */}

        <div className="form-group">

          <label>

            Force Password Reset

          </label>

          <select

            value={String(formData.forcePasswordReset ?? false)}

            onChange={(e) =>

              updateField(

                "forcePasswordReset",

                e.target.value === "true"

              )

            }

          >

            <option value="false">

              No

            </option>

            <option value="true">

              Yes

            </option>

          </select>

        </div>

        {/* Two Factor Authentication */}

        <div className="form-group">

          <label>

            Two-Factor Authentication

          </label>

          <select

            value={String(formData.twoFactorEnabled ?? false)}

            onChange={(e) =>

              updateField(

                "twoFactorEnabled",

                e.target.value === "true"

              )

            }

          >

            <option value="false">

              Disabled

            </option>

            <option value="true">

              Enabled

            </option>

          </select>

        </div>

        {/* Failed Login Attempts */}

        <div className="form-group">

          <label>

            Failed Login Attempts

          </label>

          <input

            type="number"

            value={formData.failedLoginAttempts || 0}

            readOnly

          />

        </div>

        {/* Last Password Change */}

        <div className="form-group">

          <label>

            Last Password Change

          </label>

          <input

            type="text"

            value={

              formData.passwordChangedAt

                ? new Date(

                    formData.passwordChangedAt

                  ).toLocaleString()

                : "Never"

            }

            readOnly

          />

        </div>

      </div>

      {/* ==========================================
          ADMIN ACTIONS
      ========================================== */}

      <div className="security-actions">

        <button

          type="button"

          className="secondary-button"

        >

          Send Password Reset Link

        </button>

        <button

          type="button"

          className="secondary-button"

        >

          Reset Login Attempts

        </button>

        <button

          type="button"

          className="warning-button"

        >

          Force Logout

        </button>

        <button

          type="button"

          className="danger-button"

        >

          Delete Member

        </button>

      </div>

    </section>

  );

}

export default SecuritySection;