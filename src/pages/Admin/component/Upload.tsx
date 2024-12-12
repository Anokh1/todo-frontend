import config from "config/server.config";
import { LoadingProvider, useLoading } from "context/LoadingContext";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { FileUpload } from "primereact/fileupload";
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
  date: Date | null;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

const Upload: React.FC<UploadProps> = ({
  onUpdateImageList,
  date,
  setDate,
}) => {
  const fileUploadRef = useRef<FileUpload>(null);
  const toastRef = useRef<Toast>(null);
  const { startLoading, stopLoading } = useLoading();
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const fileService = new FileService();

  const fetchImage = async () => {
    // const res = await fileService.getImage();
    const res = await fileService.getImageByDate(date);
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
  }, [date]);

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

  const handleFileExport = async () => {
    startLoading();
    setIsLoading(true);
    try {
      const res = await fileService.exportExcel(date);

      if (res) {
        const contentDispositionHeader = res.headers["content-disposition"];
        if (!contentDispositionHeader) {
          console.error("Content-Disposition header is missing");
          showWarning(toastRef, "File download failed. Please try again.");
          stopLoading();
          setIsLoading(false);
          return;
        }

        const fileName = contentDispositionHeader
          .split(";")
          .find((part) => part.trim().startsWith("filename="))
          .split("=")[1]
          .trim()
          .split('"')[1]
          .split(".")[0];

        const blob = new Blob([res.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${fileName}.xlsx`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Clean up
        stopLoading();
        setIsLoading(false);
        return { status: true, message: "Success" };
      } else {
        showWarning(toastRef, "No file for upload");
        stopLoading();
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error while exporting file:", error);
      showWarning(toastRef, "An error occurred while exporting the file");
      stopLoading();
      setIsLoading(false);
    }
  };

  const startContent = (
    <Calendar
      className="w-full md:w-15rem"
      style={{
        backgroundColor: "white",
        borderBottom: "1px solid #ccc",
        borderRadius: "4px",
        outline: "none",
      }}
      value={date}
      onChange={(e: any) => {
        setDate(e.value);
      }}
      view="month"
      dateFormat="mm/yy"
      placeholder="Select a Month"
      showIcon
    />
  );

  const endContent = (
    <div className="flex align-items-center gap-3">
      <Button
        className="bg-green-500 hover:bg-green-600 border-green-500"
        icon="pi pi-file-excel"
        label="Export"
        onClick={handleFileExport}
        disabled={isLoading}
        style={{ width: "100%" }}
      />
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
        style={{ width: "100%" }}
        disabled={isLoading}
      />
    </div>
  );

  return (
    <LoadingProvider>
      <div className="p-3">
        <Toast ref={toastRef} />
        <div className="flex justify-content-between align-items-center">
          <div>{startContent}</div>
          <div>{endContent}</div>
        </div>
      </div>
    </LoadingProvider>
  );
};

export default Upload;
