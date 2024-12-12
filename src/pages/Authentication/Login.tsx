import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "services/auth.service";
import { AuthenticationBackground } from "Template/AuthenticationBackground";
import { TODO_TOKEN } from "utilities/Constant/localStorageName.constant";
import FormError from "utilities/Form/FormError";
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
  const toastRef = useRef<Toast>(null);
  const authService = new AuthService();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Enter an email"),
      password: Yup.string().required("Enter your password"),
    }),
    onSubmit: (values: any) => {
      let apiFunc = authService.loginUser;
      callApi({ apiFunc, setLoading }, values).then((res: any) => {
        if (res.status) {
          localStorage.setItem(TODO_TOKEN, res.token);
          navigate("/");
          showSuccessToast(res.message);
        } else {
          showErrorToast(res.message);
        }
      });
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
  }, []);

  return (
    <div className="flex align-items-center justify-content-center min-h-screen">
      <AuthenticationBackground />
      <Toast ref={toastRef} />

      <Card
        className="shadow-5 p-5 border-round-lg"
        style={{ maxWidth: "400px", width: "90%"}}
        // title="Login"
        // subTitle="Create an account by contacting the admin
      >
        <form onSubmit={formik.handleSubmit}>
          {/* <AuthenticationLogo /> */}
          <div className="mb-3">
            <InputText
              name="email"
              type="email"
              placeholder="Email"
              className="w-full"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            <FormError
              touched={formik.touched.email}
              errors={formik.errors.email}
            />
          </div>
          <div className="mb-3">
            <InputText
              name="password"
              type="password"
              placeholder="Password"
              className="w-full"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <FormError
              touched={formik.touched.password}
              errors={formik.errors.password}
            />
          </div>
          <Button
            type="submit"
            loading={loading}
            label="Log In"
            className="w-full p-button-lg p-button-primary"
            style={{
              background: "linear-gradient(to right, #6a11cb, #2575fc)",
            }}
          />
        </form>
      </Card>
    </div>
  );
};
