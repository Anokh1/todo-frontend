import React from "react";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Navbar from "../components/navbar";

export default function Authentication() {
  return (
    <div>
      <Navbar />
      <div className="section">
        <div className="left-section">
          <div className="form-section">
            <h2>Login</h2>
            <span className="p-float-label input">
              <InputText className="form-input" />
              <label htmlFor="input_value">Email</label>
            </span>
            <span className="p-float-label input">
              <InputText className="form-input" />
              <label htmlFor="input_value">Password</label>
            </span>
            <Button type="submit" label="Login" />
          </div>
        </div>
        <div className="right-section">
          <div className="form-section">
            <h2>Register</h2>
            <span className="p-float-label input">
              <InputText className="form-input" />
              <label htmlFor="input_value">Email</label>
            </span>
            <span className="p-float-label input">
              <InputText className="form-input" />
              <label htmlFor="input_value">First Name</label>
            </span>
            <span className="p-float-label input">
              <InputText className="form-input" />
              <label htmlFor="input_value">Last Name</label>
            </span>
            <span className="p-float-label input">
              <InputText className="form-input" />
              <label htmlFor="input_value">Password</label>
            </span>
            <span className="p-float-label input">
              <InputText className="form-input" />
              <label htmlFor="input_value">Confirm Password</label>
            </span>
            <Button type="submit" label="Register" />
          </div>
        </div>
      </div>
    </div>
  );
}
