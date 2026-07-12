import { Search } from "lucide-react";
import "./SearchBar.css";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search...",
}) => {
  return (
    <div className="search-bar">

      <Search
        className="search-icon"
        size={18}
      />

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />

    </div>
  );
};

export default SearchBar;