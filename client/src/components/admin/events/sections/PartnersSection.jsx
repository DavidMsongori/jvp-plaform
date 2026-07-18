import { Handshake, Plus, Trash2 } from "lucide-react";

const partnerRoles = [
  "Organizer",
  "Co-Organizer",
  "Sponsor",
  "Supporting Partner",
  "Media Partner",
  "Knowledge Partner",
];

const PartnersSection = ({
  data,
  onChange,
}) => {
  const partners = data.partners || [];

  const addPartner = () => {
    onChange("partners", [
      ...partners,
      {
        name: "",
        role: "Sponsor",
        website: "",
      },
    ]);
  };

  const updatePartner = (
    index,
    field,
    value
  ) => {
    const updated = [...partners];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    onChange("partners", updated);
  };

  const removePartner = (index) => {
    onChange(
      "partners",
      partners.filter((_, i) => i !== index)
    );
  };

  return (
    <section className="form-section">

      <div className="section-header">

        <Handshake size={20} />

        <div>

          <h2>Partners</h2>

          <p>
            Organizations supporting this
            event.
          </p>

        </div>

      </div>

      {partners.map((partner, index) => (

        <div
          key={index}
          className="partner-card"
        >

          <div className="form-grid">

            <div className="form-group">

              <label>
                Partner Name
              </label>

              <input
                type="text"
                value={partner.name}
                onChange={(e) =>
                  updatePartner(
                    index,
                    "name",
                    e.target.value
                  )
                }
              />

            </div>

            <div className="form-group">

              <label>Role</label>

              <select
                value={partner.role}
                onChange={(e) =>
                  updatePartner(
                    index,
                    "role",
                    e.target.value
                  )
                }
              >
                {partnerRoles.map((role) => (
                  <option
                    key={role}
                    value={role}
                  >
                    {role}
                  </option>
                ))}
              </select>

            </div>

            <div className="form-group full-width">

              <label>
                Website
              </label>

              <input
                type="url"
                placeholder="https://"
                value={partner.website}
                onChange={(e) =>
                  updatePartner(
                    index,
                    "website",
                    e.target.value
                  )
                }
              />

            </div>

          </div>

          <button
            type="button"
            className="delete-partner-btn"
            onClick={() =>
              removePartner(index)
            }
          >
            <Trash2 size={16} />
            Remove Partner
          </button>

        </div>

      ))}

      <button
        type="button"
        className="add-partner-btn"
        onClick={addPartner}
      >
        <Plus size={18} />
        Add Partner
      </button>

    </section>
  );
};

export default PartnersSection;