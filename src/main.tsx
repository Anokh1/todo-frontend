import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./utils/authProvider";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "react-toastify/dist/ReactToastify.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "./css/App.scss";
import { LoadingProvider } from "context/LoadingContext";
// TEst the branch 1
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <LoadingProvider>
          <App />
        </LoadingProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
