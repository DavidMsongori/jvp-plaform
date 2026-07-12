import "./Programme.css";

const programme = [
  { time: "08:00", title: "Registration & Networking" },
  { time: "09:00", title: "Opening Ceremony" },
  { time: "10:00", title: "Keynote Addresses" },
  { time: "11:00", title: "Parallel Summit Tracks" },
  { time: "13:00", title: "Networking Lunch" },
  { time: "14:00", title: "Innovation Showcase" },
  { time: "15:30", title: "Awards & Recognition" },
  { time: "16:30", title: "Closing Ceremony" },
];

const partnersLeft = [
  {
    name: "Partner 5",
    logo: "partner5.png",
    url: "#",
  },
  {
    name: "Partner 6",
    logo: "partner6.png",
    url: "#",
  },
];

const partnersRight = [
  {
    name: "Partner 10",
    logo: "partner10.png",
    url: "#",
  },
  {
    name: "Partner 11",
    logo: "partner11.png",
    url: "#",
  },
];

export default function Programme() {
  return (
    <section id="programme" className="programme">

      <div className="programme-container">

        {/* ================= HEADER ================= */}

        <div className="programme-header">

          <span className="section-tag">
            Programme & Partners
          </span>

          <h2>
            One Day. Endless Opportunities.
          </h2>

          <p>
            Experience a carefully curated programme while connecting
            with organizations committed to empowering the next
            generation of leaders across Kenya's Coast Region.
          </p>

        </div>

        {/* ================= CONTENT ================= */}

        <div className="programme-grid">

          {/* =========================================
              LEFT SIDE
          ========================================== */}

          <div className="programme-left">

            <h3>
              Programme at a Glance
            </h3>

            <div className="programme-list">

              {programme.map((item) => (

                <div
                  className="programme-item"
                  key={item.time}
                >

                  <div className="programme-time">

                    {item.time}

                  </div>

                  <div className="programme-title">

                    {item.title}

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* =========================================
              RIGHT SIDE
          ========================================== */}

          <div className="partners-panel">

            <h3>
              Strategic Partners
            </h3>

            <p>
              Proudly supported by organizations investing in youth
              leadership, innovation and sustainable development.
            </p>

            <div className="partners-wrapper">

              {/* LEFT COLUMN */}

              <div className="partners-column up">

                {[...partnersLeft, ...partnersLeft, ...partnersLeft].map(
                  (partner, index) => (

                    <a
                      href={partner.url}
                      className="partner-card"
                      key={`left-${index}`}
                    >

                      <img
                        src={`/images/partners/${partner.logo}`}
                        alt={partner.name}
                      />

                    </a>

                  )
                )}

              </div>

              {/* RIGHT COLUMN */}

              <div className="partners-column down">

                {[...partnersRight, ...partnersRight, ...partnersRight].map(
                  (partner, index) => (

                    <a
                      href={partner.url}
                      className="partner-card"
                      key={`right-${index}`}
                    >

                      <img
                        src={`/images/partners/${partner.logo}`}
                        alt={partner.name}
                      />

                    </a>

                  )
                )}

              </div>

            </div>

            <div className="partner-footer">

              <h4>
                Become a Strategic Partner
              </h4>

              <p>
                Showcase your organization, engage with over 10,000
                participants and support youth-led transformation
                across Kenya's Coast Region.
              </p>

              <a
                href="#contact"
                className="partner-btn"
              >
                Partner With Us
              </a>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}