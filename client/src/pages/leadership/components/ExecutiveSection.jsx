import "./ExecutiveSection.css";

import LeaderCard from "./LeaderCard";

export default function ExecutiveSection({
  leaders = [],
}) {
  if (!leaders.length) {
    return null;
  }

  return (
    <section className="executive-section">

      <div className="executive-header">

        <span className="section-tag">
          Regional Leadership
        </span>

        <h2>
          Regional Executive Committee
        </h2>

        <p>
          The Regional Executive Committee provides
          strategic direction and oversees the
          implementation of JVP's vision, programmes
          and activities across the six Coastal
          Counties.
        </p>

      </div>

      <div className="executive-grid">

        {leaders.map((leader) => (

          <LeaderCard
            key={leader._id}
            leader={leader}
          />

        ))}

      </div>

    </section>
  );
}