import React, { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import ButtonLink from "../components/buttonLink";
import { login } from "../services/authService";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../utils/userContext";
import { decodedToken, setAuthTokenCookie } from "../services/cookieService";
import { setToken } from "../services/localStorageService";
import { Password } from "primereact/password";
const jwtDecode = require("jwt-decode");

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toastRef = useRef<Toast>(null);

  const { setUser } = useUserContext();

  const handleLogin = () => {
    login(email, password)
      .then((user) => {
        // console.log(user);

        if (user.length === 1) {
          if (toastRef.current != null) {
            toastRef.current.show({
              severity: "error",
              summary: user[0],
              detail: "Please try again",
            });
          }
        } else {
          if (toastRef.current != null) {
            setToken(user[2]);
            toastRef.current.show({
              severity: "success",
              summary: "Login success",
              detail: "Let's get started",
            });
            setTimeout(async function () {
              navigate("/home");
            }, 900);

            setUser(user[0], user[1], user[3]);
            // console.log(user[3]);
          }
        }
      })
      .catch((error) => {
        if (toastRef.current != null) {
          toastRef.current.show({
            severity: "error",
            summary: "Login Failed",
            detail: "Please try again",
          });
        }
      });
  };
  return (
    <div>
      <Toast ref={toastRef}></Toast>
      <div className="form-section">
        <h2>Login</h2>
        <span className="p-float-label input">
          <InputText
            className="form-input"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="input_value">Email</label>
        </span>
        <span className="p-float-label input">
          <Password
            onChange={(e) => setPassword(e.target.value)}
            toggleMask
            feedback={false}
            inputStyle={{ width: "300px" }}
          />
          <label htmlFor="input_value">Password</label>
        </span>
        <Button type="submit" onClick={handleLogin} label="Login" />
        <ButtonLink to="/register">Register</ButtonLink>
      </div>
    </div>
  );
}
