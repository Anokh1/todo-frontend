import { Chart } from "chart.js";
import "chart.js/auto";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";
import ScanService from "services/scan.service";
import { downloadExcel } from "utilities/Function/downloadExcel.function";
import {
  showError,
  showSuccess,
  showWarning,
} from "utilities/Function/toast.function";
import { SettingProps } from "utilities/Interface/ScanInterface";

const UploadDownload: React.FC<SettingProps> = ({ fetchData }) => {
  const toastRef = useRef<Toast>(null);

  const [visible, setVisible] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [fileType, setFileType] = useState<string>("");

  const scanService = new ScanService();

  const uploadNameList = async (event: any) => {
    const file = event.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await scanService.uploadName(formData);
        if (res.status && res.data.filePath) {
          fetchData();
          showSuccess(toastRef, "File uploaded");
        }
      } catch (error) {
        showError(toastRef, "File upload fail");
      }
    }
  };

  const uploadPrizeList = async (event: any) => {
    const file = event.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await scanService.uploadPrize(formData);
        if (res.status && res.data.filePath) {
          showSuccess(toastRef, "File uploaded");
        }
      } catch (error) {
        showError(toastRef, "File upload fail");
      }
    }
  };

  const uploadAttendanceList = async (event: any) => {
    const file = event.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await scanService.uploadAttendance(formData);
        if (res.status && res.data.filePath) {
          showSuccess(toastRef, "File uploaded");
        }
      } catch (error) {
        showError(toastRef, "File upload fail");
      }
    }
  };

  const getFolderFile = async (type: string) => {
    try {
      const res = await scanService.getFolderFile(type);
      if (res.status && res.data) {
        if (res.data.length > 0) {
          setVisible(true);
          setSelectedFile(res.data[0].name);
          setFileType(res.data[0].type);
        } else {
          showWarning(toastRef, "No file uploaded");
        }
      }
    } catch (error) {
      showError(toastRef, "File retrieve fail");
    }
  };

  const handleDownload = async () => {
    const res = await scanService.downloadFile(fileType);
    if (res.status) {
      const link = res.data.filePath;
      const fileName = link.split("/").pop();
      await downloadExcel(link, fileName);
      showSuccess(toastRef, "File downloaded");
    } else {
      showError(toastRef, "Download failed");
    }
    setVisible(false);
  };

  const handleDelete = async () => {
    const res = await scanService.deleteFile(selectedFile, fileType);
    if (res.status) {
      showSuccess(toastRef, "File deleted");
    } else {
      showError(toastRef, "File delete failed");
    }
    setVisible(false);
    setSelectedFile("");
    setFileType("");
  };

  return (
    <div className="col-12 md:col-6">
      <Toast ref={toastRef} />
      <div className="p-3">
        <p>
          Select a file for upload and remember to remove the file before
          uploading a new file.
        </p>
      </div>

      {/* Inputs and Submit Button */}
      <div className="col-12 md:col-6">
        <h3>Name List Excel</h3>
        <div className="flex">
          <div className="flex-grow">
            <FileUpload
              mode="basic"
              name="files"
              customUpload
              uploadHandler={uploadNameList}
              multiple
              maxFileSize={100 * 1024 * 1024}
              auto={true}
              chooseLabel="Upload"
              style={{ width: "100%" }}
            />
          </div>
          <div className="ml-2">
            <Button
              label="Download"
              style={{ width: "100%" }}
              onClick={() => getFolderFile("name_list")}
            />
          </div>
        </div>
      </div>
      <div className="col-12 md:col-6">
        <h3>Prize List Excel</h3>
        <div className="flex">
          <div className="flex-grow">
            <FileUpload
              mode="basic"
              name="files"
              customUpload
              uploadHandler={uploadPrizeList}
              multiple
              maxFileSize={100 * 1024 * 1024}
              auto={true}
              chooseLabel="Upload"
              style={{ width: "100%" }}
            />
          </div>
          <div className="ml-2">
            <Button
              label="Download"
              style={{ width: "100%" }}
              onClick={() => getFolderFile("prize")}
            />
          </div>
        </div>
      </div>

      <div className="col-12 md:col-6">
        <h3>Attendance List Excel</h3>
        <div className="flex">
          <div className="flex-grow">
            <FileUpload
              mode="basic"
              name="files"
              customUpload
              uploadHandler={uploadAttendanceList}
              multiple
              maxFileSize={100 * 1024 * 1024}
              auto={true}
              chooseLabel="Upload"
              style={{ width: "100%" }}
            />
          </div>
          <div className="ml-2">
            <Button
              label="Download"
              style={{ width: "100%" }}
              onClick={() => getFolderFile("attendance")}
            />
          </div>
        </div>
      </div>

      <Dialog
        className="w-30rem" // Set width using PrimeFlex
        header="Download File"
        visible={visible}
        onHide={() => {
          setVisible(false);
          setSelectedFile("");
          setFileType("");
        }}
      >
        <div>
          {selectedFile !== "" ? (
            <div>
              <div
                className="flex align-items-center justify-content-between mb-2"
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: "10px",
                  background: "#f9f9f9",
                }}
              >
                <p style={{ margin: 0 }}>{selectedFile}</p>
              </div>
              <div className="flex justify-content-end gap-2">
                <Button
                  label="Download"
                  icon="pi pi-download"
                  className="p-button-success p-button-sm"
                  onClick={handleDownload}
                />
                <Button
                  label="Delete"
                  icon="pi pi-trash"
                  className="p-button-danger p-button-sm"
                  onClick={handleDelete}
                />
              </div>
            </div>
          ) : (
            <p>No files available to download.</p>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default UploadDownload;
