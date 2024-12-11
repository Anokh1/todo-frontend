import App from "App";
import { Login } from "pages/Authentication/Login";
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { LoadingProvider } from "utilities/Context/LoadingContext";
import { UserContextProvider } from "utilities/Context/UserContext";

const AppWrapper = () => {
  let location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <LoadingProvider>
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={
              <UserContextProvider>
                <App />
              </UserContextProvider>
            }
          />
        </Routes>
      </LoadingProvider>
    </>
  );
};

export default AppWrapper;
