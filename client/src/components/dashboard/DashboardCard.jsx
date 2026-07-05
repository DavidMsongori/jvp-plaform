import "./DashboardCard.css";

function DashboardCard({

    title,

    value,

    icon

}){

    return(

        <div className="dashboard-card">

            <span>

                {icon}

            </span>

            <h3>

                {value}

            </h3>

            <p>

                {title}

            </p>

        </div>

    );

}

export default DashboardCard;