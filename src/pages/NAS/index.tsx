import Upload from "./component/Upload";
import Viewer from "./component/Viewer";

const NAS: React.FC = () => {
  // const CopyToClipboardLink = () => {
  const filePath = "Z:\\tv.png";

  const handleCopyToClipboard = (filePath: string) => {
    navigator.clipboard
      .writeText(filePath)
      .then(() => {
        // console.log("Copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };
  // };
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: "25%",
          padding: "5px",
        }}
      >
        {/* <h1>NAS-UV</h1> */}
        <Upload />
      </div>
      <div style={{ width: "75%", padding: "5px" }}>
        <Viewer />
      </div>
    </div>
  );
};

export default NAS;
