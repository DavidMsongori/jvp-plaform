import "./News.css";

function News() {

    return(

        <section className="news">

            <h2>Latest News</h2>

            <div className="news-grid">

                <div className="news-card">

                    <h3>Youth Leadership Forum</h3>

                    <p>
                        Empowering young leaders across the Coast Region.
                    </p>

                </div>

                <div className="news-card">

                    <h3>Climate Action Initiative</h3>

                    <p>
                        Thousands of trees planted through JVP programs.
                    </p>

                </div>

                <div className="news-card">

                    <h3>Scholarship Opportunities</h3>

                    <p>
                        Supporting youth access to education and skills.
                    </p>

                </div>

            </div>

        </section>

    );

}

export default News;