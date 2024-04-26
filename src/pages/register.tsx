import React, { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import ButtonLink from "../components/buttonLink";
import { Toast } from "primereact/toast";
import { login, register } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../utils/userContext";
import { setToken } from "../services/localStorageService";

export default function Register() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState(21);

  const toastRef = useRef<Toast>(null);

  const navigate = useNavigate();
  const { setUser } = useUserContext();

  const handleRegister = () => {
    if (password === confirmPassword) {
      register(email, firstName, lastName, age, password)
        .then((reply) => {
          if (reply === "User created") {
            if (toastRef.current != null) {
              toastRef.current.show({
                severity: "success",
                summary: reply,
                detail: "Let's get started",
              });
              login(email, password).then((user) => {
                setToken(user[2]);
                // console.log(email, password);
                setTimeout(async function () {
                  navigate("/home");
                }, 900);

                setUser(user[0], user[1], user[3]);
                // console.log(user[0], user[1], user[3]);
              });
            }
          } else {
            if (toastRef.current != null) {
              toastRef.current.show({
                severity: "error",
                summary: reply,
                detail: "Please use a different email address",
              });
            }
          }
        })
        .catch((error) => {
          if (toastRef.current != null) {
            toastRef.current.show({
              severity: "error",
              summary: "Register Failed",
              detail: "Please try again",
            });
          }
        });
    } else {
      if (toastRef.current != null) {
        toastRef.current.show({
          severity: "error",
          summary: "Register Failed",
          detail: "Password and confirm password does not match",
        });
      }
    }
  };

  return (
    <div className="register-form-section">
      <Toast ref={toastRef}></Toast>
      <h2>Register</h2>
      <span className="p-float-label input">
        <InputText
          className="form-input"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="input_value">Email</label>
      </span>
      <span className="p-float-label input">
        <InputText
          className="form-input"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="input_value">First Name</label>
      </span>
      <span className="p-float-label input">
        <InputText
          className="form-input"
          onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor="input_value">Last Name</label>
      </span>
      <span className="p-float-label input">
        <InputText
          className="form-input"
          // value={age.toString()}
          // value={typeof age === "string" ? "1" : age.toString()}
          onChange={(e) => setAge(parseInt(e.target.value))}
        />
        <label htmlFor="input_value">Age</label>
      </span>
      <span className="p-float-label input">
        <InputText
          type="password"
          className="form-input"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="input_value">Password</label>
      </span>
      <span className="p-float-label input">
        <InputText
          type="password"
          className="form-input"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <label htmlFor="input_value">Confirm Password</label>
      </span>
      <Button type="submit" onClick={handleRegister} label="Register" />
      <ButtonLink to="/login">Login</ButtonLink>
    </div>
  );
}
