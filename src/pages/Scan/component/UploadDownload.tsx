import { Chart } from "chart.js";
import "chart.js/auto";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import React, { useRef, useState } from "react";

const UploadDownload: React.FC = () => {
  const chartRef = useRef<Chart<"doughnut"> | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [prizeWon, setPrizeWon] = useState<string | null>(null);
  const [prizeMessage, setPrizeMessage] = useState<string | null>(null);

  return (
    <div className="col-12 md:col-6">
      <div className="p-3">
        <p>
          Select a file for upload and remember to remove the file before
          uploading a new file.
        </p>
      </div>

      {/* Inputs and Submit Button */}
      <div className="col-12 md:col-6">
        <div className="flex">
          <div className="flex-grow">
            <FileUpload
              mode="basic"
              name="files"
              customUpload
              multiple
              maxFileSize={100 * 1024 * 1024}
              auto={true}
              chooseLabel="Upload"
              style={{ width: "100%" }}
            />
          </div>
          <div className="ml-2">
            <Button
              label="Download"
              style={{ width: "100%" }}
              disabled={spinning}
            />
          </div>
        </div>
      </div>
      <div className="col-12 md:col-6">
        <h3>Prize List Excel</h3>
        <div className="flex">
          <div className="flex-grow">
            <FileUpload
              mode="basic"
              name="files"
              customUpload
              multiple
              maxFileSize={100 * 1024 * 1024}
              auto={true}
              chooseLabel="Upload"
              style={{ width: "100%" }}
            />
          </div>
          <div className="ml-2">
            <Button
              label="Download"
              style={{ width: "100%" }}
              disabled={spinning}
            />
          </div>
        </div>
      </div>

      <div className="col-12 md:col-6">
        <h3>Attendance List Excel</h3>
        <div className="flex">
          <div className="flex-grow">
            <FileUpload
              mode="basic"
              name="files"
              customUpload
              multiple
              maxFileSize={100 * 1024 * 1024}
              auto={true}
              chooseLabel="Upload"
              style={{ width: "100%" }}
            />
          </div>
          <div className="ml-2">
            <Button
              label="Download"
              style={{ width: "100%" }}
              disabled={spinning}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDownload;
