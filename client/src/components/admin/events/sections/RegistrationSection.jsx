import {
  Settings,
  Users,
  CreditCard,
  CalendarClock,
  ShieldCheck,
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

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="section-header">

        <div className="section-title">

          <Settings size={20} />

          <div>

            <h2>Registration</h2>

            <p>
              Configure how participants
              register for this event.
            </p>

          </div>

        </div>

      </div>

      {/* ==========================================
          GENERAL SETTINGS
      ========================================== */}

      <div className="checkbox-grid">

        <label className="checkbox-item">

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

          <div>

            <strong>
              Enable Registration
            </strong>

            <small>
              Participants can register
              online for this event.
            </small>

          </div>

        </label>

        <label className="checkbox-item">

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

          <div>

            <strong>
              Members Only
            </strong>

            <small>
              Restrict registration to JVP
              members.
            </small>

          </div>

        </label>

      </div>

      {/* ==========================================
          SHOW EVERYTHING ONLY IF ENABLED
      ========================================== */}

      {registration.enabled && (
        <>

          {/* ======================================
              PARTICIPATION RULES
          ====================================== */}

          <div className="checkbox-grid">

            <label className="checkbox-item">

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

              <div>

                <strong>
                  Allow Waitlist
                </strong>

                <small>
                  Accept additional
                  participants after the
                  event reaches capacity.
                </small>

              </div>

            </label>

            <label className="checkbox-item">

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

              <div>

                <strong>
                  Manual Approval
                </strong>

                <small>
                  Registrations require
                  administrator approval.
                </small>

              </div>

            </label>

          </div>

          {/* ======================================
              CAPACITY & AGES
          ====================================== */}

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
                    Number(
                      e.target.value
                    )
                  )
                }
              />

              <small>
                Leave 0 for unlimited.
              </small>

            </div>

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

          {/* ======================================
              PAYMENT
          ====================================== */}

          <div className="checkbox-grid">

            <label className="checkbox-item">

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

              <div>

                <strong>
                  Paid Registration
                </strong>

                <small>
                  Charge participants when
                  registering.
                </small>

              </div>

            </label>

          </div>

          {registration.paymentRequired && (
            <div className="form-grid">

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
                      Number(
                        e.target.value
                      )
                    )
                  }
                />

              </div>

              <div className="form-group">

                <label>
                  Currency
                </label>

                <select
                  value={
                    registration.currency
                  }
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
          )}

          {/* ======================================
              REGISTRATION WINDOW
          ====================================== */}

          <div className="form-grid">

            <div className="form-group">

              <label>

                <CalendarClock size={16} />

                Registration Opens

              </label>

              <input
                type="datetime-local"
                value={
                  registration.opensAt
                }
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

                <ShieldCheck size={16} />

                Registration Closes

              </label>

              <input
                type="datetime-local"
                value={
                  registration.closesAt
                }
                onChange={(e) =>
                  update(
                    "closesAt",
                    e.target.value
                  )
                }
              />

            </div>

          </div>

        </>
      )}

    </section>
  );
};

export default RegistrationSection;