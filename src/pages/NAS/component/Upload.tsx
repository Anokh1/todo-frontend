import { useLoading } from "context/LoadingContext";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import { Image } from "primereact/image";
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

const Upload: React.FC = ({}) => {
  const fileUploadRef = useRef<FileUpload>(null);
  const toastRef = useRef<Toast>(null);
  const { startLoading, stopLoading } = useLoading();
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedPath, setSelectedPath] = useState<NasPath | null>(null);
  const [pathList, setPathList] = useState<NasPath[]>([]);

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
    <div style={{ padding: "10px", maxWidth: "600px", margin: "auto" }}>
      <Toast ref={toastRef} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <Image
          src="src\assets\images\data-server.png"
          width="120"
          height="auto"
          style={{ marginBottom: "8px", marginTop: "8px" }}
        />
        <h1>NAS.UV DSM223</h1>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <Dropdown
          id="fileDropdown"
          value={selectedPath}
          options={pathList}
          onChange={(e) => setSelectedPath(e.value)}
          optionLabel="name"
          placeholder="Select a path"
          style={{ width: "100%" }}
        />
      </div>
      <div>
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
          style={{ width: "100%" }}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default Upload;
