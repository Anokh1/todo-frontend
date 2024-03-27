import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import ButtonLink from "../components/buttonLink";

export default function Login() {
  return (
    <div>
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
        <ButtonLink to="/register">Register</ButtonLink>
      </div>
    </div>
  );
}
