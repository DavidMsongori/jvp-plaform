import "./AssemblySection.css";

import LeaderCard from "./LeaderCard";

export default function AssemblySection({
  leaders = [],
}) {
  if (!leaders.length) {
    return null;
  }

  return (
    <section className="assembly-section">

      {/* ======================================
          HEADER
      ======================================= */}

      <div className="assembly-header">

        <span className="section-tag">
          Representation
        </span>

        <h2>
          JVP Youth Assembly
        </h2>

        <p>
          The Youth Assembly serves as the representative
          body of Jumuiya ya Vijana wa Pwani, bringing
          together young leaders from across the Coast
          Region to champion youth participation,
          accountability, policy advocacy and inclusive
          development.
        </p>

      </div>

      {/* ======================================
          GRID
      ======================================= */}

      <div className="assembly-grid">

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