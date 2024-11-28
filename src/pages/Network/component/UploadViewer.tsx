import config from "config/server.config";
import { useLoading } from "context/LoadingContext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { Image } from "primereact/image";
import { Panel } from "primereact/panel";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import NASService from "services/nas.service";
import SynologyService from "services/synology.service";
import {
  showError,
  showSuccess,
  showWarning,
} from "utilities/Function/toast.function";

interface NasPath {
  id: number;
  name: string;
  path: string;
}

interface NasFile {
  id: number;
  file_name: string;
  file_location: string;
}

const UploadViewer: React.FC = () => {
  const fileUploadRef = useRef<FileUpload>(null);
  const toastRef = useRef<Toast>(null);
  const { startLoading, stopLoading } = useLoading();
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedPath, setSelectedPath] = useState<NasPath | null>(null);
  const [pathList, setPathList] = useState<NasPath[]>([]);
  const [selectedFile, setSelectedFile] = useState<NasFile | null>(null);
  const [fileList, setFileList] = useState<NasFile[]>([]);

  const nasService = new NASService();
  const synologyService = new SynologyService();

  const fetchPath = async () => {
    const res = await nasService.getPath();
    if (res.status) {
      setPathList(res.data);
    }
  };

  useEffect(() => {
    fetchPath();
  }, []);

  const fetchList = async () => {
    const res = await synologyService.getFileList();
    if (res.status) {
      setFileList(
        res.data.map((file: string, index: number) => ({
          id: index,
          file_name: file,
          file_location: `${config.hostname}:${config.backend_port}/Z/${file}`,
        }))
      );
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleUpload = async (event: any) => {
    const formData = new FormData();
    const files = event.files;

    if (files && files.length > 0 && selectedPath) {
      files.forEach((file: File) => {
        formData.append("files", file);
      });

      const networkPath = selectedPath.path;
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
          fetchList();
        } else {
          showError(toastRef, "File upload fail");
        }

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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Dropdown
            id="fileDropdown"
            value={selectedPath}
            options={pathList}
            onChange={(e) => setSelectedPath(e.value)}
            optionLabel="name"
            placeholder="Select a path"
            style={{ flex: "3", marginRight: "10px" }}
          />
          <FileUpload
            mode="basic"
            name="files"
            ref={fileUploadRef}
            accept={activeIndex === 0 ? "image/*,application/pdf" : "video/*"}
            customUpload
            multiple
            uploadHandler={handleUpload}
            maxFileSize={100 * 1024 * 1024}
            auto={true}
            chooseLabel="Upload"
            style={{ flex: "1" }}
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Viewer Section */}
      <div style={{ flex: "1 1 60%", padding: "20px" }}>
        <div
          className="card"
          style={{ width: "100%", height: "100%", padding: "30px" }}
        >
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="fileDropdown">File name: </label>
            <Dropdown
              id="fileDropdown"
              value={selectedFile}
              options={fileList}
              onChange={(e) => setSelectedFile(e.value)}
              optionLabel="file_name"
              placeholder="Select a file"
              style={{ width: "500px", marginLeft: "10px" }}
            />
            <Button
              onClick={() => setSelectedFile(null)}
              style={{ marginLeft: "10px" }}
              severity="danger"
            >
              Clear
            </Button>
          </div>

          <Panel className="mb-2" header="PDF Viewer">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "300px",
              }}
            >
              {selectedFile ? (
                <embed
                  src={selectedFile.file_location}
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
