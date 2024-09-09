import axios from "axios";
import config from "config/server.config";
import { serviceApiPrefix } from "utilities/Constant/serviceApiPrefix.constant";

const url = `${config.hostname}:${config.backend_port}/${serviceApiPrefix.AUTH_API_PREFIX}`;
const axiosInstance = axios.create({ baseURL: url });

export default class AuthService {
  loginUser(values: any) {
    return axiosInstance.post(url + "/login", values).then((res) => res.data);
  }

  createUser(values: any) {
    return axiosInstance.post(url + "/create", values).then((res) => res.data);
  }
}
