import { Link } from "react-router-dom";

import {
  Newspaper,
  Calendar,
  ArrowRight,
} from "lucide-react";

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
      <section className="news-panel dashboard-card">
        <div className="empty-state">
          Loading latest news...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="news-panel dashboard-card">
        <div className="empty-state">
          {error}
        </div>
      </section>
    );
  }

  if (!dashboard?.news) {
    return (
      <section className="news-panel dashboard-card">
        <div className="empty-state">
          News unavailable.
        </div>
      </section>
    );
  }

  const { news } = dashboard;

  return (

    <section className="news-panel dashboard-card">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="news-header">

        <div className="news-title">

          <Newspaper size={22} />

          <div>

            <h2>

              Latest News

            </h2>

            <p>

              Stay updated with JVP announcements and stories.

            </p>

          </div>

        </div>

        <Link
          to="/news"
          className="view-news-btn"
        >

          View All

          <ArrowRight size={18} />

        </Link>

      </div>

      {/* ==========================================
          EMPTY STATE
      ========================================== */}

      {

        news.length === 0 ? (

          <div className="empty-state">

            <h3>

              No News Available

            </h3>

            <p>

              Check back later for the latest updates.

            </p>

          </div>

        ) : (

          <div className="news-list">

            {

              news.map((article) => (

                <article

                  key={article.id}

                  className="news-card hover-lift"

                >

                  <span className="news-category">

                    {article.category}

                  </span>

                  <h3>

                    {article.title}

                  </h3>

                  <p>

                    {article.excerpt}

                  </p>

                  <div className="news-footer">

                    <span>

                      <Calendar size={15} />

                      {article.date}

                    </span>

                    <Link

                      to="/news"

                      className="read-more"

                    >

                      Read More

                      <ArrowRight size={16} />

                    </Link>

                  </div>

                </article>

              ))

            }

          </div>

        )

      }

    </section>

  );

}

export default RecentNews;