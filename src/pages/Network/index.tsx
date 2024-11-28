import UploadViewer from "./component/UploadViewer";

const Network: React.FC = () => {
  return (
    <div style={{ display: "flex" }}>
      {/* <div
        style={{
          width: "25%",
          padding: "5px",
        }}
      ></div>
      <div style={{ width: "75%", padding: "5px" }}></div> */}
      <UploadViewer />
    </div>
  );
};

export default Network;
