import React, { useState, useRef } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";

const UploadExcelPage = () => {
  const [file, setFile] = useState<File | null>(null); // Added type File for useState
  const toastRef = useRef<Toast>(null);

  const upload = async () => {
    if (!file) {
      console.error("No file selected");
      if (toastRef.current != null) {
        toastRef.current.show({
          severity: "error",
          summary: "Upload failed",
          detail: "Please choose a file",
        });
      }
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:3002/api/upload",
        formData
      );
      console.log("File uploaded successfully");
      // Optionally, perform any actions after successful upload
      if (toastRef.current != null) {
        toastRef.current.show({
          severity: "success",
          summary: "Upload success",
          detail: `${file.name} uploaded`,
        });
      }
    } catch (err) {
      console.error("Error uploading file:", err);
      // Optionally, handle error and display a message to the user
    }
  };

  return (
    <div className="updateBox">
      <Toast ref={toastRef}></Toast>
      <Card title="File" className="md:w-45rem" style={{ width: "33em" }}>
        <div className="file-upload-container">
          <label htmlFor="file-upload" className="custom-file-upload">
            Choose file
          </label>
          <p>{file ? file.name : ""} </p>
        </div>
        <input
          id="file-upload"
          type="file"
          accept=".xls,.xlsx"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        />
        <div>
          <Button
            type="button"
            onClick={upload}
            icon="pi pi-upload"
            label="Upload"
            style={{ marginTop: "0.5em" }}
          />
          <Button
            type="button"
            onClick={() => setFile(null)}
            icon="pi pi-trash"
            severity="danger"
            label="Clear"
            style={{ marginLeft: "1em" }}
          />
        </div>
      </Card>
    </div>
  );
};

export default UploadExcelPage;

{
  /* <FileUpload
        accept=".xls,.xlsx"
        mode="basic"
        url="http://localhost:3002/api/upload" // Specify the full URL of your backend endpoint here
        uploadHandler={(e) => setFile(e.files ? e.files[0] : null)}
        onUpload={upload}
      /> */
}
