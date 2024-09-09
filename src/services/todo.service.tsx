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

export default class TodoService {
  getTodo() {
    return axiosInstance.get(url + "/getTodo").then((res) => res.data);
  }

  createTodo(values: any) {
    return axiosInstance
      .post(url + "/createTodo", values)
      .then((res) => res.data);
  }

  updateTodo(values: any) {
    return axiosInstance
      .patch(url + "/updateTodo", values)
      .then((res) => res.data);
  }

  deactivateTodo(values: any) {
    return axiosInstance
      .patch(url + "/deactivateTodo", values)
      .then((res) => res.data);
  }
}
