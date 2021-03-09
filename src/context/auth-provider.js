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
        if (error.response.status === 401) {
          setState({
            status: "error",
            error: error.response.data.message,
            user: null,
          });
        }
      });
  }, []);
  console.log(state);
  return (
    <AuthContext.Provider value={state}>
      {state.status === "pending" ? (
        <LoadingSpinner />
      ) : state.status === "error" ? (
        <div>
          <div>
            <pre>{state.error}</pre>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

// export function useAuth() {
//   const context = React.useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error(`useAuth must be used within a AuthProvider`);
//   }
//   return context;
// }

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
