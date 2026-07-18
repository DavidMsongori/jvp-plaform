import { Mic2, Plus, Trash2 } from "lucide-react";

const SpeakersSection = ({ data, onChange }) => {
  const speakers = data.speakers || [];

  const updateSpeaker = (
    index,
    field,
    value
  ) => {
    const updated = [...speakers];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    onChange("speakers", updated);
  };

  const addSpeaker = () => {
    onChange("speakers", [
      ...speakers,
      {
        name: "",
        title: "",
        organization: "",
      },
    ]);
  };

  const removeSpeaker = (index) => {
    onChange(
      "speakers",
      speakers.filter((_, i) => i !== index)
    );
  };

  return (
    <section className="form-section">

      <div className="section-header">

        <Mic2 size={20} />

        <div>

          <h2>Speakers</h2>

          <p>
            Add guest speakers for this event.
          </p>

        </div>

      </div>

      {speakers.map((speaker, index) => (

        <div
          className="speaker-card"
          key={index}
        >

          <div className="form-grid">

            <div className="form-group">

              <label>Name</label>

              <input
                type="text"
                value={speaker.name}
                onChange={(e) =>
                  updateSpeaker(
                    index,
                    "name",
                    e.target.value
                  )
                }
              />

            </div>

            <div className="form-group">

              <label>Title</label>

              <input
                type="text"
                value={speaker.title}
                onChange={(e) =>
                  updateSpeaker(
                    index,
                    "title",
                    e.target.value
                  )
                }
              />

            </div>

            <div className="form-group full-width">

              <label>
                Organization
              </label>

              <input
                type="text"
                value={
                  speaker.organization
                }
                onChange={(e) =>
                  updateSpeaker(
                    index,
                    "organization",
                    e.target.value
                  )
                }
              />

            </div>

          </div>

          <button
            type="button"
            className="delete-speaker-btn"
            onClick={() =>
              removeSpeaker(index)
            }
          >
            <Trash2 size={16} />
            Remove Speaker
          </button>

        </div>

      ))}

      <button
        type="button"
        className="add-speaker-btn"
        onClick={addSpeaker}
      >
        <Plus size={18} />
        Add Speaker
      </button>

    </section>
  );
};

export default SpeakersSection;