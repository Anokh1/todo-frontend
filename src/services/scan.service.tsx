import axios from "axios";
import config from "config/server.config";
import { serviceApiPrefix } from "utilities/Constant/serviceApiPrefix.constant";
import { getToken } from "utilities/Function/getToken.function";

const url = `${config.hostname}:${config.backend_port}/${serviceApiPrefix.SCAN_API_PREFIX}`;
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

export default class ScanService {
  getFile(type: string) {
    return axiosInstance
      .get("/getFile", { params: { type } })
      .then((res) => res.data);
  }
  getData(type: string) {
    return axiosInstance
      .get("/getData", { params: { type } })
      .then((res) => res.data);
  }
  getFolderFile(type: string) {
    return axiosInstance
      .get("/getFolderFile/", { params: { type } })
      .then((res) => res.data);
  }
  downloadFile(type: string) {
    return axiosInstance
      .get("/downloadFile", { params: { type } })
      .then((res) => res.data);
  }

  uploadName(file: any) {
    return axiosInstance.post("/uploadName", file).then((res) => res.data);
  }
  uploadPrize(file: any) {
    return axiosInstance.post("/uploadPrize", file).then((res) => res.data);
  }
  uploadAttendance(file: any) {
    return axiosInstance
      .post("/uploadAttendance", file)
      .then((res) => res.data);
  }

  deleteFile(file: string, type: string) {
    return axiosInstance
      .delete("/deleteFile", { data: { file, type } })
      .then((res) => res.data);
  }

  addSpin(
    inputType: "scan" | "employeeId",
    inputValue: string,
    columnToUpdate: string
  ) {
    return axiosInstance
      .post("/addSpin", {
        inputType,
        inputValue,
        columnToUpdate,
      })
      .then((res) => res.data);
  }

  addAttendance(
    inputType: "scan" | "employeeId",
    inputValue: string,
    columnToUpdate: string
  ) {
    return axiosInstance
      .post("/addAttendance", {
        inputType,
        inputValue,
        columnToUpdate,
      })
      .then((res) => res.data);
  }

  addEmployeePrize(inputValue: string, employeeId: string) {
    return axiosInstance
      .post("/addEmployeePrize", {
        inputValue,
        employeeId,
      })
      .then((res) => res.data);
  }

  addPrizeWinner(inputValue: string, prizeName: string) {
    return axiosInstance
      .post("/addPrizeWinner", {
        inputValue,
        prizeName,
      })
      .then((res) => res.data);
  }
}
