import { Save } from "lucide-react";

import { useProfile } from "../../../../context/ProfileContext";

function PersonalTab() {

  const {

    profile,

  } = useProfile();

  if (!profile) return null;

  return (

    <div>

      <h2>

        Personal Information

      </h2>

      <p className="tab-description">

        Keep your personal details up to date.

      </p>

      <div className="profile-form-grid">

        <div className="form-group">

          <label>

            First Name

          </label>

          <input

            type="text"

            defaultValue={

              profile.firstName

            }

          />

        </div>

        <div className="form-group">

          <label>

            Middle Name

          </label>

          <input

            type="text"

            defaultValue={

              profile.middleName

            }

          />

        </div>

        <div className="form-group">

          <label>

            Last Name

          </label>

          <input

            type="text"

            defaultValue={

              profile.lastName

            }

          />

        </div>

        <div className="form-group">

          <label>

            Gender

          </label>

          <select

            defaultValue={

              profile.gender || ""

            }

          >

            <option value="">

              Select

            </option>

            <option>

              Male

            </option>

            <option>

              Female

            </option>

          </select>

        </div>

        <div className="form-group">

          <label>

            Date of Birth

          </label>

          <input

            type="date"

            defaultValue={

              profile.dateOfBirth

            }

          />

        </div>

        <div className="form-group">

          <label>

            National ID

          </label>

          <input

            type="text"

            defaultValue={

              profile.nationalId

            }

            disabled

          />

        </div>

        <div className="form-group">

          <label>

            Phone

          </label>

          <input

            type="text"

            defaultValue={

              profile.phone

            }

          />

        </div>

        <div className="form-group">

          <label>

            Email

          </label>

          <input

            type="email"

            defaultValue={

              profile.email

            }

            disabled

          />

        </div>

      </div>

      <div className="tab-actions">

        <button className="save-btn">

          <Save size={18} />

          Save Changes

        </button>

      </div>

    </div>

  );

}

export default PersonalTab;