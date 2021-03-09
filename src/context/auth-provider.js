import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../api/apiUtil";
import LoadingSpinner from "../pages/common/LoadingSpinner";

const AuthContext = React.createContext();

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
          console.log("Request made and server responded");
          // console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);
          setState({
            status: error.response.status,
            error: error.response.data.message,
            user: null,
          });
        } else if (error.request) {
          console.log("The request was made but no response was received");
          // console.log(error.request);
          setState({
            status: "error",
            error: "Server is down !",
            user: null,
          });
        } else {
          console.log(
            "Something happened in setting up the request that triggered an Error"
          );
          setState({
            status: "error",
            error: error.message,
            user: null,
          });
          console.log("Error", error.message);
        }
      });
  }, []);

  return (
    <AuthContext.Provider value={state}>
      {state.status === "pending" ? (
        <LoadingSpinner />
      ) : state.status === "error" ? (
        <div>
          <div>
            <p>{state.error}</p>
          </div>
        </div>
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
