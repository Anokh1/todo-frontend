import React, { useState } from "react";
import axios from "axios";

const UploadExcelPage = () => {
  const [file, setFile] = useState<File | null>(null); // Added type File for useState

  const upload = () => {
    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("http://localhost:3002/api/upload", formData)
      .then((res) => {
        console.log("File uploaded successfully");
        // Optionally, perform any actions after successful upload
      })
      .catch((err) => {
        console.error("Error uploading file:", err);
        // Optionally, handle error and display a message to the user
      });
  };

  return (
    <div>
      <h1>Upload Excel File</h1>
      <input
        type="file"
        accept=".xls,.xlsx"
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
      />
      <div>
        <button type="button" onClick={upload}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default UploadExcelPage;
