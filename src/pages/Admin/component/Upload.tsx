import config from "config/server.config";
import { useLoading } from "context/LoadingContext";
import { Card } from "primereact/card";
import { FileUpload } from "primereact/fileupload";
import { Image } from "primereact/image";
import { Menu } from "primereact/menu";
import { TabPanel, TabView } from "primereact/tabview";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import FileService from "services/file.service";
import {
  showError,
  showSuccess,
  showWarning,
} from "utilities/Function/toast.function";

interface ImageFile {
  id: number;
  file_name: string;
  file_location: string;
  actual_url: string;
  insert_date: Date;
}

const Upload: React.FC = ({}) => {
  const fileUploadRef = useRef<FileUpload>(null);
  const toastRef = useRef<Toast>(null);
  const { startLoading, stopLoading } = useLoading();
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [imageFile, setImageFile] = useState<ImageFile[]>([]);

  const fileService = new FileService();

  const fetchImage = async () => {
    const res = await fileService.getImage();
    if (res.status) {
      setImageFile(
        res.data.map((img: ImageFile) => ({
          ...img,
          actual_url: `${config.hostname}:${config.backend_port}/${img.file_location}`,
        }))
      );
    }
  };

  useEffect(() => {
    fetchImage();
  }, []);

  const handleUpload = async (event: any) => {
    const formData = new FormData();
    const files = event.files;

    if (files && files.length > 0) {
      files.forEach((file: File) => {
        formData.append("files", file);
      });
      startLoading();
      setIsLoading(true);
      try {
        let res;
        if (activeIndex === 0) {
          res = await fileService.uploadImage(formData);
        }

        if (res && res.status) {
          showSuccess(toastRef, "File upload success");
          fetchImage();
        } else {
          showError(toastRef, "File upload fail");
        }

        fileUploadRef.current?.clear();
      } catch (error) {
        console.error("Upload error: ", error);
        showError(toastRef, "Upload error");
      }
      stopLoading();
      setIsLoading(false);
    } else {
      showWarning(toastRef, "No file for upload");
    }
  };

  return (
    <div>
      <Toast ref={toastRef} />
      <h2>Upload</h2>
      <FileUpload
        mode="basic"
        name="files"
        ref={fileUploadRef}
        accept={activeIndex === 0 ? "image/*,application/pdf" : "video/*"}
        customUpload
        multiple
        uploadHandler={handleUpload}
        maxFileSize={100 * 1024 * 1024}
        auto={true}
        chooseLabel="Upload"
        style={{ width: "100%", marginBottom: "20px" }}
        disabled={isLoading}
      />

      <Menu />

      <TabView>
        <TabPanel header="Images">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "30px" }}>
            {imageFile.map((image, index) => (
              <Card
                key={index}
                style={{
                  width: "200px",
                  height: "auto",
                  overflow: "hidden",
                  cursor: "pointer",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
              >
                <Image
                  src={image.actual_url}
                  width="80"
                  height="auto"
                  style={{ marginBottom: "8px", marginTop: "8px" }}
                  preview
                />
                <div
                  style={{
                    marginTop: "5px",
                    fontSize: "12px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {image.file_name}
                </div>
              </Card>
            ))}
          </div>
        </TabPanel>
      </TabView>
    </div>
  );
};

export default Upload;
