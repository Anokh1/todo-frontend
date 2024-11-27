import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import NASService from "services/nas.service";

interface NasPath {
  id: number;
  name: string;
  path: string;
}

const Upload: React.FC = ({}) => {
  const [selectedPath, setSelectedPath] = useState<NasPath | null>(null);
  const [pathList, setPathList] = useState<NasPath[]>([]);

  const nasService = new NASService();

  const fetchPath = async () => {
    const res = await nasService.getPath();
    if (res.status) {
      setPathList(res.data);
    }
  };

  useEffect(() => {
    fetchPath();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
      }}
    >
        <h2>Upload</h2>
      <Dropdown
        id="fileDropdown"
        value={selectedPath}
        options={pathList}
        onChange={(e) => setSelectedPath(e.value)}
        optionLabel="name"
        placeholder="Select a path"
        style={{ width: "200px", marginLeft: "10px" }}
      />
    </div>
  );
};

export default Upload;
