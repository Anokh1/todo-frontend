import App from "App";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { LoadingProvider } from "utilities/Context/LoadingContext";
import { UserContextProvider } from "utilities/Context/UserContext";

const AppWrapper = (props: any) => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="*"
          element={
            <LoadingProvider>
              <UserContextProvider>
                <App />
              </UserContextProvider>
            </LoadingProvider>
          }
        />
      </Routes>
    </>
  );
};
