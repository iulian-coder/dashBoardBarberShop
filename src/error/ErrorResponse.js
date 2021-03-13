import React from "react";

function ErrorResponse({ errorMessage }) {
  return (
    <section className="content">
      <div className="error-page">
        <div className="error-content">
          {errorMessage ? (
            <h2 className="text-danger">Error: {errorMessage}</h2>
          ) : (
            <h2>No errors !</h2>
          )}
        </div>
      </div>
    </section>
  );
}

export default ErrorResponse;
