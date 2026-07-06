import { Link } from "react-router-dom";

import { useDashboard } from "../../context/DashboardContext";

import "./RecentNews.css";

function RecentNews() {

  const {
    dashboard,
    loading,
    error,
  } = useDashboard();

  if (loading) {
    return (
      <section className="recent-news">
        <p>Loading latest news...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="recent-news">
        <p>{error}</p>
      </section>
    );
  }

  const news = dashboard?.news || [];

  return (

    <section className="recent-news">

      <div className="widget-header">

        <div>

          <h2>Latest News</h2>

          <p>
            Stay informed with the latest updates from JVP.
          </p>

        </div>

        <Link
          to="/news"
          className="view-all-link"
        >
          View All
        </Link>

      </div>

      {news.length === 0 ? (

        <div className="empty-state">

          <h3>No News Available</h3>

          <p>
            Check back later for the latest updates.
          </p>

        </div>

      ) : (

        <div className="news-list">

          {news.map((item) => (

            <article
              key={item.id}
              className="news-card"
            >

              <div className="news-badge">

                {item.category}

              </div>

              <div className="news-content">

                <h3>

                  {item.title}

                </h3>

                <span>

                  {item.date}

                </span>

              </div>

            </article>

          ))}

        </div>

      )}

    </section>

  );

}

export default RecentNews;