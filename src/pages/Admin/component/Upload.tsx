import { useLoading } from "Context/LoadingContext";
import { FileUpload } from "primereact/fileupload";
import { Menu } from "primereact/menu";
import { TabPanel, TabView } from "primereact/tabview";
import { useRef, useState } from "react";

interface Resource {
  id: number;
  file_name: string;
  file_location: string;
  actual_url: string;
  insert_date: Date;
}

const Upload: React.FC = ({}) => {
  const fileUploadRef = useRef<FileUpload>(null);
  //   const { startLoading, stopLoading } = useLoading();
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  //   const handleUpload = async (event: any) => {
  //     const formData = new FormData();
  //     const files = event.files;

  //     if (files && files.length > 0) {
  //       files.forEach((file: File) => {
  //         formData.append("files", file);
  //       });
  //       startLoading();
  //       setIsLoading(true);
  //       //   try {
  //       //     let res;
  //       //     if (activeindex === 0) {

  //       //     }
  //       //   } catch () {

  //       //   }
  //       stopLoading();
  //       setIsLoading(false);
  //     } else {
  //     }
  //   };

  return (
    <div>
      <h2>Upload</h2>
      <FileUpload
        mode="basic"
        name="files"
        ref={fileUploadRef}
        accept={activeIndex === 0 ? "image/*,application/pdf" : "video/*"}
        customUpload
        multiple
        // uploadHandler={handleUpload}
        maxFileSize={100 * 1024 * 1024}
        auto={true}
        chooseLabel="Upload an image or PDF"
        style={{ width: "100%", marginBottom: "20px" }}
        disabled={isLoading}
      />

      <Menu />

      <TabView>
        <TabPanel></TabPanel>
      </TabView>
    </div>
  );
};

export default Upload;
