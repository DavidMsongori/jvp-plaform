import "./FilterBar.css";

const FilterBar = ({
  filters = [],
  values = {},
  onChange,
}) => {
  return (
    <div className="filter-bar">

      {filters.map((filter) => (

        <div
          key={filter.name}
          className="filter-item"
        >

          <label>{filter.label}</label>

          <select
            value={values[filter.name] || ""}
            onChange={(e) =>
              onChange(filter.name, e.target.value)
            }
          >
            <option value="">
              All
            </option>

            {filter.options.map((option) => (

              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>

            ))}

          </select>

        </div>

      ))}

    </div>
  );
};

export default FilterBar;