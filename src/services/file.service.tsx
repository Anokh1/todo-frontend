import axios from "axios";
import config from "config/server.config";
import { serviceApiPrefix } from "utilities/Constant/serviceApiPrefix.constant";

const url = `${config.hostname}:${config.backend_port}/${serviceApiPrefix.FILE_API_PREFIX}`;
const axiosInstance = axios.create({ baseURL: url });

export default class FileService {
  getImage() {
    return axiosInstance.get(url + "/getImage").then((res) => res.data);
  }

  uploadImage(files: any) {
    return axiosInstance
      .post(url + "/uploadImage", files)
      .then((res) => res.data);
  }

  deleteImage(id: number) {
    return axiosInstance.post("/deleteImage", { id }).then((res) => res.data);
  }

  exportExcel(date: Date) {
    return axiosInstance
      .post("/exportExcel", { date }, { responseType: "blob" })
      .then((res) => res);
  }
}
