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
    <div>
      <h1>NAS</h1>
      <div className="card">
        <div>
          <a href="Z:\\tv.png">Local</a>
        </div>
        <div>
          <a href="http://192.168.50.180:5000/sharing/oHxEZ3P4Q">
            NAS Server - EXPIRED
          </a>
        </div>
        <div>
          <a href="http://192.168.50.180:5000/sharing/rBCLYfwBv">NAS Server</a>
        </div>
        <div>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault(); // Prevent navigation
              handleCopyToClipboard("Z:\\tv.png");
            }}
          >
            Copy File Path
          </a>
          {/* Optional: Styled Button */}
          {/* <Button
            label="Copy File Path"
            icon="pi pi-copy"
            onClick={handleCopyToClipboard}
            className="p-button-text"
          /> */}
        </div>
        <div>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault(); // Prevent navigation
              handleCopyToClipboard(
                "Z:\\multi-img-1727916262792d03b0ce7-39ac-4657-82e1-f341a39f7241.png"
              );
            }}
          >
            PNG
          </a>
        </div>
        <div>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault(); // Prevent navigation
              handleCopyToClipboard("Z:\\P&L_SA-2024-005 (Revision 1).pdf");
            }}
          >
            PDF
          </a>
        </div>
        <div>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault(); // Prevent navigation
              handleCopyToClipboard("Z:\\PartMaster.xlsx");
            }}
          >
            XLSX
          </a>
        </div>
      </div>
    </div>
  );
};

export default NAS;
