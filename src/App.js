import React, { lazy, Suspense } from "react";
import Footer from "./pages/common/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthState } from "./context/auth-provider";
import LoadingSpinner from "./pages/common/LoadingSpinner";

const AuthenticatedApp = lazy(() => import("./authenticated-app"));
const UnauthenticatedApp = lazy(() => import("./unauthenticated-app"));
// Suspense lets components “wait” for something before rendering. 
// Suspense only supports one use case: loading components dynamically with React.lazy.
// https://reactjs.org/docs/react-api.html
function App() {
  const { user } = useAuthState();
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="wrapper">
        <ToastContainer />
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        <Footer />
      </div>
    </Suspense>
  );
}

export default App;
