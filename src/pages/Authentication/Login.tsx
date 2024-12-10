import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "services/auth.service";
import { TODO_TOKEN } from "utilities/Constant/localStorageName.constant";
import { callApi } from "utilities/Function/callApi.function";
import {
  showErrorToast,
  showSuccessToast,
} from "utilities/Function/customToast.function";
import { getToken } from "utilities/Function/getToken.function";
import * as Yup from "yup";

export const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const toastRef = useRef<Toast>(null);

  const authService = new AuthService();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values: any) => {
      let apiFunc = authService.loginUser;
      callApi(
        { apiFunc, setLoading },
        values.then((res: any) => {
          if (res.status) {
            localStorage.setItem(TODO_TOKEN, res.token);
            navigate("/");
            showSuccessToast(res.message);
          } else {
            showErrorToast(res.message);
          }
        })
      );
    },
  });

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setLoading(true);
      if (getToken() !== null) {
        navigate("/");
      } else {
        setLoading(false);
      }
    }

    return () => {
      isMounted = false;
    };
  });

  return (
    <div className="flex align-items-center justify-content-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <Toast ref={toastRef} />

      <Card
        className="shadow-5 p-5 border-round-lg"
        style={{ maxWidth: "400px", width: "90%" }}
      >
        <h2 className="text-center text-3xl font-bold mb-3">Welcome Back!</h2>
        <p className="text-center text-sm text-500 mb-5">
          Please log in to continue
        </p>
        <div className="mb-3">
          <label htmlFor="email" className="block text-600 font-medium mb-2">
            Email
          </label>
          <InputText
            id="email"
            type="email"
            placeholder="Enter your email"
            className="w-full p-inputtext-lg"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="block text-600 font-medium mb-2">
            Password
          </label>
          <Password
            id="password"
            placeholder="Enter your password"
            toggleMask
            feedback={false}
            className="w-full p-inputtext-lg"
          />
        </div>
        <div className="flex justify-content-between align-items-center mb-5">
          <div>
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember" className="text-sm text-500">
              Remember me
            </label>
          </div>
          <a href="#" className="text-sm text-primary font-medium">
            Forgot Password?
          </a>
        </div>
        <Button
          type="submit"
          loading={loading}
          label="Log In"
          className="w-full p-button-lg p-button-primary"
          style={{ background: "linear-gradient(to right, #6a11cb, #2575fc)" }}
        />
        <Divider className="my-5" />
        <p className="text-center text-sm text-500">
          Don't have an account?{" "}
          <a href="#" className="text-primary font-medium">
            Sign Up
          </a>
        </p>
      </Card>
    </div>
  );
};


