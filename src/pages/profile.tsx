import React from "react";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Navbar from "../components/navbar";
import { Card } from "primereact/card";
import { useUserContext } from "../utils/userContext";

export default function Profile() {
  const { userEmail, userId, setUser, clearUser } = useUserContext();

  const handleLogout = () => {
    // Call the clearUser function from the context
    clearUser();
    // Additional logout logic can go here (e.g., redirecting to the login page)
  }

  return (
    <div className="App">
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
