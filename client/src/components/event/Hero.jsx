import { Search, CalendarDays, MapPin, Users } from "lucide-react";

const Hero = ({
  search = "",
  statistics = {},
  onSearch,
}) => {
  const {
    totalEvents = 0,
    upcomingEvents = 0,
    featuredEvents = 0,
  } = statistics;

  return (
    <section className="events-hero">
      <div className="events-hero__overlay"></div>

      <div className="events-hero__content">

        <span className="events-hero__eyebrow">
          JVP CONNECT EVENTS
        </span>

        <h1 className="events-hero__title">
          Discover Events That Inspire,
          Connect and Transform.
        </h1>

        <p className="events-hero__description">
          Explore conferences, summits, trainings,
          workshops, networking sessions and community
          initiatives organized by Jumuiya ya Vijana wa
          Pwani and our partners.
        </p>

        <div className="events-search">

          <Search
            size={20}
            className="events-search__icon"
          />

          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) =>
              onSearch(e.target.value)
            }
            className="events-search__input"
          />

        </div>

        <div className="events-hero__stats">

          <div className="events-stat-card">
            <CalendarDays size={22} />
            <div>
              <h3>{totalEvents}</h3>
              <span>Events</span>
            </div>
          </div>

          <div className="events-stat-card">
            <Users size={22} />
            <div>
              <h3>{upcomingEvents}</h3>
              <span>Upcoming</span>
            </div>
          </div>

          <div className="events-stat-card">
            <MapPin size={22} />
            <div>
              <h3>{featuredEvents}</h3>
              <span>Featured</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;