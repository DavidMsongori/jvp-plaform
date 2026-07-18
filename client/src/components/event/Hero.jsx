import "./Event.css";

const Hero = () => {
  return (
    <section className="event-hero">
      <div className="event-hero-overlay">

        <div className="event-hero-content">

          <span className="event-badge">
            JVP Connect Events
          </span>

          <h1>
            Discover Events That Inspire, Connect
            and Empower Youth
          </h1>

          <p>
            Explore conferences, leadership forums,
            trainings, workshops, networking sessions
            and community activities happening across
            the Coast Region and beyond.
          </p>

          <div className="event-hero-stats">

            <div className="hero-stat">
              <h2>100+</h2>
              <span>Events</span>
            </div>

            <div className="hero-stat">
              <h2>10K+</h2>
              <span>Participants</span>
            </div>

            <div className="hero-stat">
              <h2>6</h2>
              <span>Counties</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;