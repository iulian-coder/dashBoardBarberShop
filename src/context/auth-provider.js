import React, { useEffect, useState, createContext } from "react";
import { GetCurrentUser } from "../api/apiUtil";
import LoadingSpinner from "../pages/common/LoadingSpinner";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [state, setState] = useState({
    status: "pending",
    error: null,
    user: null,
  });

  useEffect(() => {
    GetCurrentUser()
      .then((res) => {
        setState({ status: "success", error: null, user: res.data });
      })
      .catch((error) => {
        if (error.response) {
          setState({
            status: error.response.status,
            error: error.response.data.message,
            user: null,
          });
        } else if (error.request) {
          setState({
            status: "error",
            error:
              "Server is down !" +
              " If you are on Heroku please go https://dashboardbarbershopapi.herokuapp.com/" +
              " (server enters in to sleep mode on free account) ",
            user: null,
          });
        } else {
          setState({
            status: "error",
            error: error.message,
            user: null,
          });
        }
      });
  }, []);

  return (
    <AuthContext.Provider value={state}>
      {state.status === "pending" ? (
        <LoadingSpinner />
      ) : state.status === "error" ? (
        <section className="content">
          <div className="error-page">
            <div className="error-content">
              <h2 className="text-danger">Error: {state.error}</h2>
            </div>
          </div>
        </section>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export function useAuthState() {
  const state = React.useContext(AuthContext);
  const isPending = state.status === "pending";
  const isError = state.status === "error";
  const isSuccess = state.status === "success";
  const isAuthenticated = state.user && isSuccess;
  return {
    ...state,
    isPending,
    isError,
    isSuccess,
    isAuthenticated,
  };
}
