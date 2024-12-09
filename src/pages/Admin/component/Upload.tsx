import config from "config/server.config";
import { useLoading } from "context/LoadingContext";
import { FileUpload } from "primereact/fileupload";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import FileService from "services/file.service";
import {
  showError,
  showSuccess,
  showWarning,
} from "utilities/Function/toast.function";
import { ImageFile } from "utilities/Interface/AdminInterface";

interface UploadProps {
  onUpdateImageList: (images: ImageFile[]) => void;
}

const Upload: React.FC<UploadProps> = ({ onUpdateImageList }) => {
  const fileUploadRef = useRef<FileUpload>(null);
  const toastRef = useRef<Toast>(null);
  const { startLoading, stopLoading } = useLoading();
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const fileService = new FileService();

  const fetchImage = async () => {
    const res = await fileService.getImage();
    if (res.status) {
      // setImageFile(
      onUpdateImageList(
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
    </div>
  );
};

export default Upload;
