import "./CountyLeadershipSection.css";

import LeaderCard from "./LeaderCard";

const COUNTY_ORDER = [
  "Mombasa",
  "Kwale",
  "Kilifi",
  "Tana River",
  "Lamu",
  "Taita Taveta",
];

export default function CountyLeadershipSection({
  counties = {},
}) {
  const orderedCounties = [
    ...COUNTY_ORDER.filter(
      (county) => counties[county]
    ),
    ...Object.keys(counties).filter(
      (county) =>
        !COUNTY_ORDER.includes(county)
    ),
  ];

  if (!orderedCounties.length) {
    return null;
  }

  return (
    <section className="county-section">

      {/* ======================================
          HEADER
      ======================================= */}

      <div className="county-header">

        <span className="section-tag">
          County Leadership
        </span>

        <h2>
          County Leadership Teams
        </h2>

        <p>
          JVP leadership extends across all six
          counties of the Coast Region. Each county
          team coordinates programmes, youth
          engagement, advocacy and community
          initiatives within their respective county.
        </p>

      </div>

      {/* ======================================
          COUNTIES
      ======================================= */}

      {orderedCounties.map((county) => {

        const leaders =
          counties[county] || [];

        const sortedLeaders =
          [...leaders].sort(
            (a, b) =>
              (a.displayOrder || 0) -
              (b.displayOrder || 0)
          );

        return (

          <div
            key={county}
            className="county-card"
          >

            <div className="county-title">

              <h3>
                {county}
              </h3>

              <span>
                {leaders.length} Leader
                {leaders.length !== 1 && "s"}
              </span>

            </div>

            <div className="county-grid">

              {sortedLeaders.map((leader) => (

                <LeaderCard
                  key={leader._id}
                  leader={leader}
                />

              ))}

            </div>

          </div>

        );

      })}

    </section>
  );
}