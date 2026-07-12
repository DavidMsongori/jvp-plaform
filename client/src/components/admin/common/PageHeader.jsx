import "./PageHeader.css";

const PageHeader = ({
  title,
  subtitle,
  icon: Icon,
  action,
}) => {
  return (
    <div className="page-header">

      <div className="page-header-left">

        {Icon && (
          <div className="page-header-icon">
            <Icon size={28} />
          </div>
        )}

        <div>

          <h2>{title}</h2>

          {subtitle && (
            <p>{subtitle}</p>
          )}

        </div>

      </div>

      {action && (
        <div className="page-header-right">
          {action}
        </div>
      )}

    </div>
  );
};

export default PageHeader;