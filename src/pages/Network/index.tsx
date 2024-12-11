import { LoadingProvider } from "context/LoadingContext";
import { useEffect, useState } from "react";
import SynologyService from "services/synology.service";
import UploadViewer from "./component/UploadViewer";

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

const Network: React.FC = () => {
  const [updateFileList, setUpdateFileList] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<NasFolder | null>(null);
  const [selectedFile, setSelectedFile] = useState<NasFile | null>(null);
  const [fileList, setFileList] = useState<NasFile[]>([]);

  const synologyService = new SynologyService();

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
    // fetchList("Z:/Intel/");
  }, [updateFileList]);

  return (
    <div style={{ display: "flex" }}>
      <LoadingProvider>
        <UploadViewer />
      </LoadingProvider>
      {/* <Upload
        setUpdateFileList={setUpdateFileList}
        updateFileList={updateFileList}
        setCurrentFolder={setSelectedFolder}
        currentFolder={selectedFolder}
      />
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
        </div> */}
      {/* </div> */}
    </div>
  );
};

export default Network;
