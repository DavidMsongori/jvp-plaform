import "./Speakers.css";

const speakers = [
  {
    name: "Hon. David Msongori",
    title: "President, JVP",
    image: "/images/speakers/speaker1.jpg",
  },
  {
    name: "Guest Speaker",
    title: "Cabinet Secretary",
    image: "/images/speakers/speaker2.jpg",
  },
  {
    name: "Panelist",
    title: "UNDP Kenya",
    image: "/images/speakers/speaker3.jpg",
  },
  {
    name: "Innovation Expert",
    title: "Tech Entrepreneur",
    image: "/images/speakers/speaker4.jpg",
  },
  {
    name: "Youth Leader",
    title: "Development Partner",
    image: "/images/speakers/speaker5.jpg",
  },
];

export default function Speakers() {
  const allSpeakers = [...speakers, ...speakers];

  return (
    <section id="speakers" className="speakers">

      <div className="speakers-container">

        <div className="speakers-header">

          <span className="section-tag">
            FEATURED SPEAKERS
          </span>

          <h2>
            Meet the Voices Shaping the Future
          </h2>

          <p>
            Distinguished leaders, innovators, policymakers and young
            changemakers will share insights, inspire action and spark
            meaningful conversations throughout the summit.
          </p>

        </div>

        <div className="speaker-slider">

          <div className="speaker-track">

            {allSpeakers.map((speaker, index) => (

              <div
                className="speaker-card"
                key={index}
              >

                <img
                  src={speaker.image}
                  alt={speaker.name}
                />

                <div className="speaker-overlay">

                  <h3>{speaker.name}</h3>

                  <span>{speaker.title}</span>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}