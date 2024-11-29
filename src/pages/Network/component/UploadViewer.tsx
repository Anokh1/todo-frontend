import { useLoading } from "context/LoadingContext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { Image } from "primereact/image";
import { Panel } from "primereact/panel";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import SynologyService from "services/synology.service";
import {
  showError,
  showSuccess,
  showWarning,
} from "utilities/Function/toast.function";

interface NasFolder {
  id: number;
  folder_name: string;
  folder_path: string;
}

interface NasFile {
  id: number;
  file_name: string;
  file_path: string;
}

const UploadViewer: React.FC = () => {
  const fileUploadRef = useRef<FileUpload>(null);
  const toastRef = useRef<Toast>(null);
  const { startLoading, stopLoading } = useLoading();
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedFile, setSelectedFile] = useState<NasFile | null>(null);
  const [fileList, setFileList] = useState<NasFile[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<NasFolder | null>(null);
  const [folderList, setFolderList] = useState<NasFolder[]>([]);
  const [uploadList, setUploadList] = useState<File[]>([]);

  const synologyService = new SynologyService();

  const fetchFolder = async () => {
    const res = await synologyService.getFolderList();
    if (res.status) {
      setFolderList(res.data);
    }
  };

  useEffect(() => {
    fetchFolder();
  }, []);

  const fetchList = async (path: string) => {
    const res = await synologyService.getFileList(path);
    if (res.status) {
      setFileList(res.data);
    }
  };

  useEffect(() => {
    if (selectedFolder) {
      fetchList(selectedFolder?.folder_path);
    }
  }, [selectedFolder]);

  const handleFileSelect = (event: any) => {
    setUploadList([...event.files]);
  };

  const handleSubmit = async (event: any) => {
    const formData = new FormData();

    if (uploadList && uploadList.length > 0 && selectedFolder) {
      uploadList.forEach((file) => {
        formData.append("files", file);
      });

      const networkPath = selectedFolder.folder_path;
      formData.append("networkPath", networkPath);
      startLoading();
      setIsLoading(true);
      try {
        let res;
        if (activeIndex === 0) {
          res = await synologyService.uploadOne(formData);
        }

        if (res && res.status) {
          showSuccess(toastRef, "File upload success");
          fetchList(selectedFolder?.folder_path);
        } else {
          showError(toastRef, "File upload fail");
        }

        setUploadList([]);
        fileUploadRef.current?.clear();
      } catch (error) {
        console.error("Upload error: ", error);
        showError(toastRef, "Upload error");
      }
      stopLoading();
      setIsLoading(false);
    } else {
      showWarning(toastRef, "No path selected");
    }
  };

  const handleClear = async () => {
    setUploadList([]);
    fileUploadRef.current?.clear();
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", padding: "20px" }}>
      {/* Upload Section */}
      <div>
        <Toast ref={toastRef} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
            marginBottom: "20px",
          }}
        >
          <Image
            src="src/assets/images/data-server.png"
            width="120"
            height="auto"
            style={{ marginRight: "8px" }}
          />
          <h1>NAS.UV DSM223</h1>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              width: "100%",
              gap: "10px",
              marginBottom: "10px",
            }}
          >
            <Dropdown
              id="fileDropdown"
              value={selectedFolder}
              options={folderList}
              onChange={(e) => setSelectedFolder(e.value)}
              optionLabel="folder_name"
              placeholder="Select a folder"
              style={{ flex: "3" }}
            />
            <FileUpload
              mode="basic"
              name="files"
              ref={fileUploadRef}
              accept={activeIndex === 0 ? "image/*,application/pdf" : "video/*"}
              customUpload
              multiple
              uploadHandler={handleFileSelect}
              maxFileSize={100 * 1024 * 1024}
              auto={true}
              chooseLabel="Select"
              style={{ flex: "1" }}
              disabled={isLoading}
            />
          </div>
          {/* Preview Section */}
          {uploadList.length > 0 && (
            <div
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <h3 style={{ marginBottom: "10px" }}>Selected Files</h3>
              <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                {uploadList.map((file, index) => (
                  <li
                    key={index}
                    style={{
                      padding: "5px 10px",
                      borderBottom: "1px solid #eee",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        maxWidth: "150px", // Adjust the width as needed
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {file.name}
                    </span>{" "}
                    <span style={{ fontSize: "0.85rem", color: "#888" }}>
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </li>
                ))}
              </ul>
              <Button
                label="Upload"
                icon="pi pi-upload"
                severity="success"
                onClick={handleSubmit}
                disabled={isLoading}
                style={{ marginTop: "10px", width: "100%" }}
              />

              <Button
                label="Clear"
                icon="pi pi-trash"
                severity="danger"
                onClick={handleClear}
                disabled={isLoading}
                style={{ marginTop: "10px", width: "100%" }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Viewer Section */}
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "600px",
        }}
      >
        <div style={{ width: "100%", height: "100%", padding: "30px" }}>
          <div style={{ marginBottom: "20px", display: "flex", width: "100%" }}>
            <Dropdown
              id="fileDropdown"
              value={selectedFile}
              options={fileList}
              onChange={(e) => setSelectedFile(e.value)}
              optionLabel="file_name"
              placeholder="Select a file"
              style={{ width: "100%" }}
            />
            <Button
              onClick={() => setSelectedFile(null)}
              style={{ marginLeft: "10px", width: "10%" }}
              severity="success"
              icon="pi pi-sync"
            />
          </div>

          <Panel className="mb-2" header="PDF Viewer">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "350px",
              }}
            >
              {selectedFile ? (
                <embed
                  src={selectedFile.file_path}
                  width="100%"
                  height="100%"
                  type="application/pdf"
                />
              ) : (
                <p style={{ textAlign: "center" }}>No file selected.</p>
              )}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
};

export default UploadViewer;
