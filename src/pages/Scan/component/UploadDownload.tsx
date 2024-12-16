import { Chart } from "chart.js";
import "chart.js/auto";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";
import ScanService from "services/scan.service";
import { showError, showSuccess } from "utilities/Function/toast.function";
import { SettingProps } from "utilities/Interface/ScanInterface";

const UploadDownload: React.FC<SettingProps> = ({ fetchData }) => {
  const toastRef = useRef<Toast>(null);

  const [spinning, setSpinning] = useState(false);
  const [prizeWon, setPrizeWon] = useState<string | null>(null);
  const [prizeMessage, setPrizeMessage] = useState<string | null>(null);

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
              disabled={spinning}
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
              disabled={spinning}
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
              disabled={spinning}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDownload;
