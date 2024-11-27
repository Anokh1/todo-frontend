import config from "config/server.config";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Panel } from "primereact/panel";
import { useEffect, useState } from "react";
import SynologyService from "services/synology.service";

interface NasFile {
  id: number;
  file_name: string;
  file_location: string;
}

const Viewer = () => {
  const [selectedFile, setSelectedFile] = useState<NasFile | null>(null);
  const [fileList, setFileList] = useState<NasFile[]>([]);

  const synologyService = new SynologyService();

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

  return (
    <div className="card" style={{ width: "800px" }}>
      <h1>Viewer</h1>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="fileDropdown">Select File: </label>
        <Dropdown
          id="fileDropdown"
          value={selectedFile}
          options={fileList}
          onChange={(e) => setSelectedFile(e.value)}
          optionLabel="file_name"
          placeholder="Select a file"
          style={{ width: "200px", marginLeft: "10px" }}
        />
        <Button
          //   onClick={() => window.open(selectedFile ? selectedFile.file_location : "", "_blank")}
          onClick={() => setSelectedFile(null)}
          style={{ marginLeft: "10px" }}
          severity="danger"
        >
          Clear
        </Button>
      </div>

      <Panel className="mb-2" header="PDF Viewer">
        <div>
          <embed
            src={selectedFile ? selectedFile.file_location : ""}
            width="600"
            height="400"
            type="application/pdf"
          />
        </div>
      </Panel>
    </div>
  );
};

export default Viewer;
