import moment from "moment";
import Upload from "pages/Admin/component/Upload";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Image } from "primereact/image";
import { Menu } from "primereact/menu";
import { TabPanel, TabView } from "primereact/tabview";
import { useRef, useState } from "react";
import { ImageFile } from "utilities/Interface/AdminInterface";

const Admin: React.FC = () => {
  const [imageList, setImageList] = useState<ImageFile[]>([]);
  const [image, setImage] = useState<ImageFile>();
  const menuRef = useRef<Menu>(null);

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

  const menuImage = [
    {
      label: "Remove",
      // command: handleRemoveImg,
      icon: "pi pi-trash",
    },
  ];

  return (
    <div className="flex flex-column align-items-center justify-content-center min-h-screen p-4">
      {/* <h1 className="text-center mb-4">Admin</h1> */}
      <div className="w-full mt-4">
        <TabView>
          <TabPanel header="Grid View">
            <div className="flex justify-content-between mb-4">
              <div className="flex-1"></div> {/* Spacer */}
              <Upload onUpdateImageList={updateImageList} />
            </div>
            <div className="flex flex-wrap gap-3 justify-content-center">
              {imageList.map((image, index) => (
                <Card
                  key={index}
                  className="flex flex-column align-items-center justify-content-start"
                  style={{
                    width: "200px",
                    height: "260px", // Fixed height for consistent layout
                    overflow: "hidden",
                  }}
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
                      maxWidth: "180px", // Prevents overflow horizontally
                      lineHeight: "1.2rem", // Adjust based on font size
                      maxHeight: "1.2rem", // Same as lineHeight to enforce a single line
                    }}
                  >
                    {image.file_name}
                  </div>
                </Card>
              ))}
            </div>
          </TabPanel>
          <TabPanel header="List View">
            <div className="flex justify-content-between mb-4">
              <div className="flex-1"></div> {/* Spacer */}
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
                      {moment(rowData.insert_date).format("DD-MM-YYYY")}
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
