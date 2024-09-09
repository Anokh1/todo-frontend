import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "services/auth.service";
import { callApi } from "utilities/Function/callApi.function";
import * as Yup from "yup";

const Authentication = () => {
  const navigate = useNavigate();
  const authService = new AuthService();
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      const data = {
        email: values.email,
        password: values.password,
      };
      callApi({ apiFunction: authService.loginUser, setLoading }, { data })
        .then
    },
  });
};
