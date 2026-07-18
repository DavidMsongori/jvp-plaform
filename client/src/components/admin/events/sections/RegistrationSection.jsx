import {
  CreditCard,
  Settings,
  Users,
} from "lucide-react";

const RegistrationSection = ({
  registration,
  onChange,
}) => {
  const update = (field, value) => {
    onChange({
      ...registration,
      [field]: value,
    });
  };

  return (
    <section className="event-section">

      <div className="section-header">

        <Settings size={20} />

        <div>

          <h2>Registration</h2>

          <p>
            Configure how participants
            register for this event.
          </p>

        </div>

      </div>

      <div className="form-grid">

        {/* Registration Enabled */}

        <label className="checkbox-field">

          <input
            type="checkbox"
            checked={registration.enabled}
            onChange={(e) =>
              update(
                "enabled",
                e.target.checked
              )
            }
          />

          Enable Registration

        </label>

        {/* Membership */}

        <label className="checkbox-field">

          <input
            type="checkbox"
            checked={
              registration.requiresMembership
            }
            onChange={(e) =>
              update(
                "requiresMembership",
                e.target.checked
              )
            }
          />

          Members Only

        </label>

        {/* Payment */}

        <label className="checkbox-field">

          <input
            type="checkbox"
            checked={
              registration.paymentRequired
            }
            onChange={(e) =>
              update(
                "paymentRequired",
                e.target.checked
              )
            }
          />

          Payment Required

        </label>

        {/* Waitlist */}

        <label className="checkbox-field">

          <input
            type="checkbox"
            checked={
              registration.allowWaitlist
            }
            onChange={(e) =>
              update(
                "allowWaitlist",
                e.target.checked
              )
            }
          />

          Allow Waitlist

        </label>

        {/* Approval */}

        <label className="checkbox-field">

          <input
            type="checkbox"
            checked={
              registration.approvalRequired
            }
            onChange={(e) =>
              update(
                "approvalRequired",
                e.target.checked
              )
            }
          />

          Require Approval

        </label>

      </div>

      <div className="form-grid">

        <div className="form-group">

          <label>

            <Users size={16} />

            Capacity

          </label>

          <input
            type="number"
            min="0"
            value={registration.capacity}
            onChange={(e) =>
              update(
                "capacity",
                Number(e.target.value)
              )
            }
          />

        </div>

        <div className="form-group">

          <label>

            <CreditCard size={16} />

            Registration Fee

          </label>

          <input
            type="number"
            min="0"
            value={
              registration.registrationFee
            }
            onChange={(e) =>
              update(
                "registrationFee",
                Number(e.target.value)
              )
            }
          />

        </div>

        <div className="form-group">

          <label>

            Currency

          </label>

          <select
            value={registration.currency}
            onChange={(e) =>
              update(
                "currency",
                e.target.value
              )
            }
          >

            <option value="KES">
              Kenyan Shilling (KES)
            </option>

            <option value="USD">
              US Dollar (USD)
            </option>

            <option value="EUR">
              Euro (EUR)
            </option>

          </select>

        </div>

      </div>

      <div className="form-grid">

        <div className="form-group">

          <label>

            Minimum Age

          </label>

          <input
            type="number"
            min="0"
            value={
              registration.minimumAge
            }
            onChange={(e) =>
              update(
                "minimumAge",
                e.target.value
              )
            }
          />

        </div>

        <div className="form-group">

          <label>

            Maximum Age

          </label>

          <input
            type="number"
            min="0"
            value={
              registration.maximumAge
            }
            onChange={(e) =>
              update(
                "maximumAge",
                e.target.value
              )
            }
          />

        </div>

      </div>

      <div className="form-grid">

        <div className="form-group">

          <label>

            Registration Opens

          </label>

          <input
            type="datetime-local"
            value={registration.opensAt}
            onChange={(e) =>
              update(
                "opensAt",
                e.target.value
              )
            }
          />

        </div>

        <div className="form-group">

          <label>

            Registration Closes

          </label>

          <input
            type="datetime-local"
            value={registration.closesAt}
            onChange={(e) =>
              update(
                "closesAt",
                e.target.value
              )
            }
          />

        </div>

      </div>

    </section>
  );
};

export default RegistrationSection;