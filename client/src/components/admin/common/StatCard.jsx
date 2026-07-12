import "./StatCard.css";

const StatCard = ({
  title,
  value,
  icon: Icon,
  color = "primary",
  subtitle,
  trend,
}) => {
  return (
    <div className="stat-card">

      <div className="stat-card-top">

        <div>
          <p className="stat-title">{title}</p>

          <h2 className="stat-value">{value}</h2>

          {subtitle && (
            <small className="stat-subtitle">
              {subtitle}
            </small>
          )}
        </div>

        {Icon && (
          <div className={`stat-icon ${color}`}>
            <Icon size={28} />
          </div>
        )}

      </div>

      {trend && (
        <div className="stat-footer">

          <span
            className={
              trend.type === "up"
                ? "trend-up"
                : trend.type === "down"
                ? "trend-down"
                : "trend-neutral"
            }
          >
            {trend.value}
          </span>

          <span className="trend-label">
            {trend.label}
          </span>

        </div>
      )}

    </div>
  );
};

export default StatCard;