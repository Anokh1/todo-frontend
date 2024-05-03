import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import Navbar from "../components/navbar";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { useUserContext } from "../utils/userContext";
import { setToken } from "../services/localStorageService";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Panel } from "primereact/panel";
import { Avatar } from "primereact/avatar";
import { Password } from "primereact/password";

export default function Profile() {
  const { userEmail, userId, userName, clearUser } = useUserContext();

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
      }, 800);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState<string>("");

  return (
    <div className="App">
      <Toast ref={toastRef}></Toast>
      <Navbar />
      <div className="updateBox">
        <div className="card flex justify-content-center">
          <Card
            // title={userEmail}
            className="md:w-45rem"
            style={{ width: "33em", marginTop: "3em" }}
          >
            <div>
              <Avatar icon="pi pi-user" shape="circle" size="xlarge" />
              <h3>{userName}</h3>
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

    // <div className="p-grid p-justify-center">
    //   <div className="p-col-8">
    //     <Panel header="Profile">
    //       <div className="p-fluid">
    //         <div className="p-field">
    //           <label htmlFor="username">Username</label>
    //           <InputText id="username" type="text" />
    //         </div>
    //         <div className="p-field">
    //           <label htmlFor="email">Email</label>
    //           <InputText id="email" type="email" />
    //         </div>
    //         <div className="p-field">
    //           <label htmlFor="password">Password</label>
    //           <InputText id="password" type="password" />
    //         </div>
    //         <div className="p-field">
    //           <label htmlFor="confirmPassword">Confirm Password</label>
    //           <InputText id="confirmPassword" type="password" />
    //         </div>
    //         <div className="p-field">
    //           <Button label="Save" icon="pi pi-check" />
    //         </div>
    //       </div>
    //     </Panel>
    //   </div>
    // </div>

    // <div className="p-grid p-justify-center">
    //   <div className="p-col-8">
    //     <Panel header="Profile">
    //       <div className="p-grid p-justify-center">
    //         <div className="p-col-4">
    // <Avatar icon="pi pi-user" shape="circle" size="xlarge" />
    //         </div>
    //         <div className="p-col-8">
    //           <div className="p-fluid">
    //             <div className="p-field">
    //               <label htmlFor="username">Username</label>
    //               <InputText id="username" type="text" value="Testing" readOnly />
    //             </div>
    //             <div className="p-field">
    //               <label htmlFor="email">Email</label>
    //               <InputText id="email" type="email" value="Testing" readOnly />
    //             </div>
    //             <div className="p-field">
    //             <Password value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} toggleMask />

    //               {/* <label htmlFor="password">Password</label>
    //               <div className="p-inputgroup">
    //                 <Password
    //                   id="password"
    //                   type={showPassword ? 'text' : 'password'}
    //                   feedback={false}
    //                 />
    //                 <span className="p-inputgroup-addon">
    //                   <button
    //                     type="button"
    //                     className="p-button p-button-text"
    //                     onClick={() => setShowPassword(!showPassword)}
    //                   >
    //                     {showPassword ? 'Hide' : 'Show'}
    //                   </button>
    //                 </span>
    //               </div> */}
    //             </div>
    //             <div className="p-field">
    //               <label htmlFor="confirmPassword">Confirm Password</label>
    //               <Password id="confirmPassword" type="password" feedback={false} />
    //             </div>
    //             <div className="p-field">
    //               <Button label="Save" icon="pi pi-check" />
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </Panel>
    //   </div>
    // </div>
  );
}
