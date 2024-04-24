import React, { useRef } from "react";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Navbar from "../components/navbar";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { useUserContext } from "../utils/userContext";
import { removeAuthTokenCookie } from "../services/cookieService";
import { setToken } from "../services/localStorageService";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { userEmail, userId, setUser, clearUser } = useUserContext();

  const toastRef = useRef<Toast>(null);

  const navigate = useNavigate();


  const handleLogout = () => {
    // clearUser(); 
    // removeAuthTokenCookie();
    setToken("");  
    if (toastRef.current != null) {
      toastRef.current.show({
        severity: "error",
        summary: "Logout success",
        detail: "Let's go",
      });
      setTimeout(async function () {
        clearUser();
        navigate("/login");
      }, 900);
      console.log(userEmail, userId);
    }
  };

  return (
    <div className="App">
      <Toast ref={toastRef}></Toast>
      <Navbar />
      <div className="updateBox">
        <div className="card flex justify-content-center">
          <Card
            title={userEmail}
            className="md:w-45rem"
            style={{ width: "33em", marginTop: "3em" }}
          >
            <div>
              <h3>{userId}</h3>
              <Button
                onClick={handleLogout}
                type="button"
                icon="pi pi-power-off"
                severity="danger"
                label="Logout"
                style={{ width: "8em" }}
              />
            </div>
          </Card>
        </div>
      </div>
      {/* <div className="section">
        <div className="left-section"></div>
        <div className="right-section"></div>
      </div> */}
    </div>
  );
}
