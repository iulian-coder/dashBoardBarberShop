import React, { useState, useEffect } from "react";
import { ACCESS_TOKEN } from "../constants";
import { useHistory } from "react-router-dom";

export default function Logout() {
  const history = useHistory();
  localStorage.removeItem(ACCESS_TOKEN);
  const timeInMilliseconds = 10000;
  const [counter, setCounter] = useState(timeInMilliseconds / 1000);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  setTimeout(() => {
    history.go(0);
  }, timeInMilliseconds);

  return (
    <section className="content">
      <div className="error-page">
        <h3 className="headline text-success"> Unauthenticated</h3>
        <div className="text-center">
          <h3>Hey! You are safely logged out!</h3>
          <h3>
            You will be redirected in {counter} seconds to <a href="/">login</a>
          </h3>
        </div>
      </div>
    </section>
  );
}
