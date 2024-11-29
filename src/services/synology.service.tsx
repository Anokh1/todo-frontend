import axios from "axios";
import config from "config/server.config";
import { serviceApiPrefix } from "utilities/Constant/serviceApiPrefix.constant";

const url = `${config.hostname}:${config.backend_port}/${serviceApiPrefix.SYNOLOGY_API_PREFIX}`;
const axiosInstance = axios.create({ baseURL: url });

export default class SynologyService {
  getFileList(networkPath: string) {
    return axiosInstance
      .get(url + "/getFileList", { params: { networkPath } })
      .then((res) => res.data);
  }

  getFolderList() {
    return axiosInstance.get(url + "/getFolderList").then((res) => res.data);
  }

  uploadOne(files: any) {
    return axiosInstance
      .post(url + "/uploadOne", files)
      .then((res) => res.data);
  }
}
