import React from "react";

function LoadingSpinner() {
  return (
    <div className="spinner-border spinner-border-sm text-danger" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default LoadingSpinner;
