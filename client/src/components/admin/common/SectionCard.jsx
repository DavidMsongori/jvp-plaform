import "./SectionCard.css";

const SectionCard = ({
  title,
  subtitle,
  action,
  children,
}) => {
  return (
    <div className="section-card">

      {(title || action) && (

        <div className="section-header">

          <div>

            {title && (
              <h4>{title}</h4>
            )}

            {subtitle && (
              <p>{subtitle}</p>
            )}

          </div>

          {action && (
            <div>
              {action}
            </div>
          )}

        </div>

      )}

      <div className="section-content">

        {children}

      </div>

    </div>
  );
};

export default SectionCard;