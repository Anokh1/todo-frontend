import Upload from "./component/Upload";
import Viewer from "./component/Viewer";

const NAS: React.FC = () => {
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: "25%",
          padding: "5px",
        }}
      >
        <Upload />
      </div>
      <div style={{ width: "75%", padding: "5px" }}>
        <Viewer />
      </div>
    </div>
  );
};

export default NAS;
