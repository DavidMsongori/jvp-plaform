import "./Programs.css";

function Programs() {

    const programs=[

        "Leadership Development",

        "Blue Economy",

        "Climate Action",

        "Youth Entrepreneurship",

        "Innovation",

        "Education & Scholarships"

    ];

    return(

        <section className="programs">

            <h2>

                Our Focus Areas

            </h2>

            <p>

                We empower young people through
                sustainable initiatives that transform
                lives across the Coast Region.

            </p>

            <div className="program-grid">

                {programs.map((program,index)=>(

                    <div
                        className="program-card"
                        key={index}
                    >

                        {program}

                    </div>

                ))}

            </div>

        </section>

    );

}

export default Programs;