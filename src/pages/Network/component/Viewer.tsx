import { useLoading } from "context/LoadingContext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { Panel } from "primereact/panel";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import SynologyService from "services/synology.service";

interface NasFile {
  id: number;
  file_name: string;
  file_path: string;
}

const Viewer: React.FC = () => {
  const fileUploadRef = useRef<FileUpload>(null);
  const toastRef = useRef<Toast>(null);
  const { startLoading, stopLoading } = useLoading();
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedFile, setSelectedFile] = useState<NasFile | null>(null);
  const [fileList, setFileList] = useState<NasFile[]>([]);

  const synologyService = new SynologyService();

  const fetchList = async (path: string) => {
    const res = await synologyService.getFileList(path);
    if (res.status) {
      setFileList(res.data);
    }
  };

  //   useEffect(() => {
  //     if (selectedFolder) {
  //       fetchList(selectedFolder?.folder_path);
  //     }
  //   }, [selectedFolder]);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", padding: "20px" }}>
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

export default Viewer;
