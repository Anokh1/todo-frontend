import { useLoading } from "context/LoadingContext";
import moment from "moment";
import Upload from "pages/Admin/component/Upload";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Image } from "primereact/image";
import { Menu } from "primereact/menu";
import { TabPanel, TabView } from "primereact/tabview";
import { useRef, useState } from "react";
import FileService from "services/file.service";
import { ImageFile } from "utilities/Interface/AdminInterface";

const Admin: React.FC = () => {
  const { startLoading, stopLoading } = useLoading();
  const [imageList, setImageList] = useState<ImageFile[]>([]);
  const [image, setImage] = useState<ImageFile>();
  const menuRef = useRef<Menu>(null);

  const fileService = new FileService();

  const updateImageList = (images: ImageFile[]) => {
    setImageList(images);
  };

  const handleImageClick = (
    image: ImageFile,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    setImage(image);
    menuRef.current?.toggle(event);
  };

  const handleRemoveImage = async () => {
    if (image) {
      startLoading();
      const res = await fileService.deleteImage(image.id);
      if (res.status) {
        const newImageList = imageList.filter((img) => img.id !== image.id);
        updateImageList(newImageList);
      }
      stopLoading();
    }
  };

  const menuImage = [
    {
      label: "Remove",
      command: handleRemoveImage,
      icon: "pi pi-trash",
    },
  ];

  return (
    <div className="flex flex-column min-h-screen p-4">
      <Menu model={menuImage} popup ref={menuRef} className="mb-4" />

      <div className="flex flex-col flex-grow">
        <TabView className="flex-grow w-full md:w-[800px]">
          <TabPanel header="Grid View">
            <div className="flex justify-content-between items-center mb-4">
              <div className="flex-1"></div>
              <Upload onUpdateImageList={updateImageList} />
            </div>
            <div className="grid grid-nogutter justify-content-center gap-3">
              {imageList.map((image, index) => (
                <Card
                  key={index}
                  className="flex flex-column align-items-center justify-content-start"
                  style={{
                    width: "200px",
                    height: "260px",
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                  onClick={(event) => handleImageClick(image, event)}
                >
                  <div
                    className="flex justify-content-center align-items-center"
                    style={{ height: "180px" }}
                  >
                    <Image
                      src={image.actual_url}
                      width="80"
                      height="auto"
                      className="mb-2"
                      preview
                    />
                  </div>
                  <div
                    className="text-sm text-center text-ellipsis overflow-hidden whitespace-nowrap"
                    style={{
                      maxWidth: "180px",
                      lineHeight: "1.2rem",
                      maxHeight: "1.2rem",
                    }}
                  >
                    {image.file_name}
                  </div>
                </Card>
              ))}
            </div>
          </TabPanel>
          <TabPanel header="List View">
            <div className="flex justify-content-between items-center mb-4">
              <div className="flex-1"></div>
              <Upload onUpdateImageList={updateImageList} />
            </div>
            <div className="p-fluid">
              <DataTable value={imageList} className="p-datatable-striped">
                <Column
                  field="file_name"
                  header="File Name"
                  style={{ minWidth: "200px" }}
                />
                <Column
                  field="insert_date"
                  header="Insert Date"
                  body={(rowData) => (
                    <span>
                      {moment(rowData.insert_date).format("DD MMM YYYY h:mm A")}
                    </span>
                  )}
                  style={{ minWidth: "150px" }}
                />
              </DataTable>
            </div>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};

export default Admin;
