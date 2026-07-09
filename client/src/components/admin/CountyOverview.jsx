import {
  Users,
  TrendingUp,
  MapPin,
} from "lucide-react";

import { useAdmin } from "../../context/AdminContext";

import "./CountyOverview.css";

function CountyOverview() {

  const {

    countyStatistics,

  } = useAdmin();

  return (

    <section className="county-overview">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="section-header">

        <div>

          <h2>

            County Overview

          </h2>

          <p>

            Membership distribution across the Coast Region.

          </p>

        </div>

      </div>

      {/* ==========================================
          COUNTIES
      ========================================== */}

      {

        countyStatistics.length === 0 ? (

          <div className="county-empty">

            County statistics unavailable.

          </div>

        ) : (

          <div className="county-list">

            {

              countyStatistics.map((county) => (

                <div

                  key={county.name}

                  className="county-row"

                >

                  <div className="county-name">

                    <MapPin size={18} />

                    <span>

                      {county.name}

                    </span>

                  </div>

                  <div className="county-members">

                    <Users size={16} />

                    <span>

                      {county.members}

                    </span>

                  </div>

                  <div className="county-growth">

                    <TrendingUp size={16} />

                    <span>

                      {county.growth || 0}%

                    </span>

                  </div>

                  <div className="county-progress">

                    <div className="progress-track">

                      <div

                        className="progress-fill"

                        style={{

                          width: `${county.progress || 0}%`,

                        }}

                      />

                    </div>

                  </div>

                </div>

              ))

            }

          </div>

        )

      }

    </section>

  );

}

export default CountyOverview;