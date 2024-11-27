import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Panel } from "primereact/panel";
import { Image } from "primereact/image";
import { useState } from "react";

const Viewer = ({}) => {
  const [selectedPath, setSelectedPath] = useState<string[]>([]);
  const pathOptions = [{ label: "Z", value: "Z:/" }];
  return (
    <div className="card">
      <h1>Viewer</h1>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="pathDropdown">Select Path: </label>
        <Dropdown
          id="pathDropdown"
          value={selectedPath}
          options={pathOptions}
          onChange={(e) => setSelectedPath(e.value)}
          placeholder="Select a path"
          style={{ width: "200px", marginLeft: "10px" }}
        />
        <Button
          onClick={() => window.open(`/#/TV/${selectedPath}`, "_blank")}
          style={{ marginLeft: "10px" }}
          severity="success"
        >
          Navigate to view file
        </Button>
      </div>

      <Panel className="mb-2" header="NAS File Viewer">
        <div>
          <Image
            src="http://localhost:3002/assets/nas/tv.png"
            alt="Image"
            width="500"
            preview
          />
        </div>
      </Panel>
    </div>
  );
};

export default Viewer;
