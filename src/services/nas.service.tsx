import axios from "axios";
import config from "config/server.config";
import { serviceApiPrefix } from "utilities/Constant/serviceApiPrefix.constant";

const url = `${config.hostname}:${config.backend_port}/${serviceApiPrefix.NAS_API_PREFIX}`;
const axiosInstance = axios.create({ baseURL: url });

export default class NASService {
  getPath() {
    return axiosInstance.get(url + "/getPath").then((res) => res.data);
  }
}
