import "./Section.css";

function MembershipSection({

  formData,

  updateField,

}) {

  return (

    <section className="edit-section">

      <div className="edit-section-header">

        <div>

          <h2>

            Membership & Account

          </h2>

          <p>

            Manage membership, role, payment and account status.

          </p>

        </div>

      </div>

      <div className="form-grid">

        {/* Membership Number */}

        <div className="form-group">

          <label>

            Membership Number

          </label>

          <input

            type="text"

            value={

              formData.membershipNumber || ""

            }

            onChange={(e) =>

              updateField(

                "membershipNumber",

                e.target.value

              )

            }

          />

        </div>

        {/* Role */}

        <div className="form-group">

          <label>

            Member Role

          </label>

          <select

            value={formData.role || "member"}

            onChange={(e) =>

              updateField(

                "role",

                e.target.value

              )

            }

          >

            <option value="member">

              Member

            </option>

            <option value="ward_leader">

              Ward Leader

            </option>

            <option value="constituency_leader">

              Constituency Leader

            </option>

            <option value="county_leader">

              County Leader

            </option>

            <option value="regional_leader">

              Regional Leader

            </option>

            <option value="secretariat">

              Secretariat

            </option>

            <option value="admin">

              Administrator

            </option>

            <option value="super_admin">

              Super Administrator

            </option>

          </select>

        </div>

        {/* Membership Status */}

        <div className="form-group">

          <label>

            Membership Status

          </label>

          <select

            value={

              formData.membershipStatus ||

              "Pending"

            }

            onChange={(e) =>

              updateField(

                "membershipStatus",

                e.target.value

              )

            }

          >

            <option value="Pending">

              Pending

            </option>

            <option value="Active">

              Active

            </option>

            <option value="Suspended">

              Suspended

            </option>

            <option value="Expired">

              Expired

            </option>

          </select>

        </div>

        {/* Activation Status */}

        <div className="form-group">

          <label>

            Activation Status

          </label>

          <select

            value={

              formData.activationStatus ||

              "Not Activated"

            }

            onChange={(e) =>

              updateField(

                "activationStatus",

                e.target.value

              )

            }

          >

            <option value="Not Activated">

              Not Activated

            </option>

            <option value="Pending OTP">

              Pending OTP

            </option>

            <option value="Activated">

              Activated

            </option>

          </select>

        </div>

        {/* Payment Status */}

        <div className="form-group">

          <label>

            Payment Status

          </label>

          <select

            value={

              formData.paymentStatus ||

              "Pending"

            }

            onChange={(e) =>

              updateField(

                "paymentStatus",

                e.target.value

              )

            }

          >

            <option value="Pending">

              Pending

            </option>

            <option value="Paid">

              Paid

            </option>

            <option value="Exempt">

              Exempt

            </option>

          </select>

        </div>

        {/* Member Since */}

        <div className="form-group">

          <label>

            Member Since

          </label>

          <input

            type="date"

            value={

              formData.memberSince

                ? formData.memberSince.substring(0,10)

                : ""

            }

            onChange={(e)=>

              updateField(

                "memberSince",

                e.target.value

              )

            }

          />

        </div>

        {/* Membership Expiry */}

        <div className="form-group">

          <label>

            Membership Expiry

          </label>

          <input

            type="date"

            value={

              formData.membershipExpiry

                ? formData.membershipExpiry.substring(0,10)

                : ""

            }

            onChange={(e)=>

              updateField(

                "membershipExpiry",

                e.target.value

              )

            }

          />

        </div>

        {/* Profile Completion */}

        <div className="form-group">

          <label>

            Profile Completion (%)

          </label>

          <input

            type="number"

            min="0"

            max="100"

            value={

              formData.profileCompleted ||

              0

            }

            readOnly

          />

        </div>

        {/* Legacy Member */}

        <div className="form-group">

          <label>

            Legacy Member

          </label>

          <select

            value={

              String(

                formData.legacyMember

              )

            }

            onChange={(e)=>

              updateField(

                "legacyMember",

                e.target.value==="true"

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

        {/* Migration */}

        <div className="form-group">

          <label>

            Migration Completed

          </label>

          <select

            value={

              String(

                formData.migrationCompleted

              )

            }

            onChange={(e)=>

              updateField(

                "migrationCompleted",

                e.target.value==="true"

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

      </div>

    </section>

  );

}

export default MembershipSection;