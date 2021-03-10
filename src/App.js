import React, { lazy, Suspense } from "react";
import Footer from "./pages/common/Footer";
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
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        <Footer />
    </Suspense>
  );
}

export default App;
