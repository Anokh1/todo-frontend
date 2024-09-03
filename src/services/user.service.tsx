import axios from "axios";
import config from "config/server.config";
import { serviceApiPrefix } from "utilities/Constant/serviceApiPrefix.constant";
import { getToken } from "utilities/Function/getToken.function";

const url = `${config.hostname}:${config.backend_port}/${serviceApiPrefix.USER_API_PREFIX}`;
const axiosInstance = axios.create({ baseURL: url });

axiosInstance.interceptors.request.use(
  (config) => {
    if (getToken()) {
      config.headers.token = getToken();
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
