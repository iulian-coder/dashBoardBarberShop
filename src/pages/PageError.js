import React from "react";
import { useLocation } from "react-router-dom";

function PageError() {
  const location = useLocation();
  return (
    <section className="content">
      <div className="error-page">
        <div className="error-content">
          {location.state === undefined ? (
            <h2>No errors !</h2>
          ) : (
            <h2 className="text-danger">Error: {location.state.detail}</h2>
          )}
        </div>
      </div>
    </section>
  );
}

export default PageError;
