import "./Partners.css";

function Partners() {

    const partners=[
        "County Governments",
        "Safaricom",
        "UNDP",
        "Mastercard Foundation",
        "Kenya Ports Authority",
        "National Government"
    ];

    return(

        <section className="partners">

            <h2>Our Partners</h2>

            <div className="partners-grid">

                {partners.map((partner,index)=>(

                    <div
                        className="partner-card"
                        key={index}
                    >

                        {partner}

                    </div>

                ))}

            </div>

        </section>

    );

}

export default Partners;