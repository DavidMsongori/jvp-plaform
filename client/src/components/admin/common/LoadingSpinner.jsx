import { Loader2 } from "lucide-react";
import "./LoadingSpinner.css";

const LoadingSpinner = ({
  text = "Loading...",
  size = 32,
}) => {
  return (
    <div className="loading-spinner">

      <Loader2
        size={size}
        className="loading-icon"
      />

      <p>{text}</p>

    </div>
  );
};

export default LoadingSpinner;