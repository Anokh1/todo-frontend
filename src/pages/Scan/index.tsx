import { LoadingProvider } from "context/LoadingContext";
import moment from "moment";
import Upload from "pages/Admin/component/Upload";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Image } from "primereact/image";
import { Menu } from "primereact/menu";
import { TabPanel, TabView } from "primereact/tabview";
import { useRef, useState } from "react";
import FileService from "services/file.service";
import { ImageFile } from "utilities/Interface/AdminInterface";
import SpinWheel from "./component/SpinWheel";
import EmployeeInput from "./component/EmployeeInput";
import UploadDownload from "./component/UploadDownload";
import ScanService from "services/scan.service";
import { showError } from "utilities/Function/toast.function";
import { Toast } from "primereact/toast";

const Scan: React.FC = () => {
  // const { startLoading, stopLoading } = useLoading();
  const [imageList, setImageList] = useState<ImageFile[]>([]);
  const [image, setImage] = useState<ImageFile>();
  const [date, setDate] = useState<Date>(new Date());
  const menuRef = useRef<Menu>(null);
  const toastRef = useRef<Toast>(null);
  const dateRef = useRef<Date>(date);
  const [nameList, setNameList] = useState([]);

  const fileService = new FileService();
  const scanService = new ScanService();

  const fetchData = async () => {
    try {
      const res = await scanService.getData("name_list");
      setNameList(res.data);
    } catch (error) {
      showError(toastRef, "Access Card and ID column cannot be empty");
    }
  };

  const updateImageList = (images: ImageFile[]) => {
    setImageList(images);
  };

  const handleImageClick = (
    image: ImageFile,
    event: React.MouseEvent<HTMLElement>
  ) => {
    setImage(image);
    menuRef.current?.toggle(event);
  };

  const handleRemoveImage = async () => {
    if (image) {
      // startLoading();
      const res = await fileService.deleteImage(image.id);
      if (res.status) {
        const newImageList = imageList.filter((img) => img.id !== image.id);
        updateImageList(newImageList);
      }
      // stopLoading();
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
    <LoadingProvider>
      <Toast ref={toastRef} />
      <div className="flex flex-column min-h-screen p-4">
        <Menu model={menuImage} popup ref={menuRef} className="mb-4" />

        <div className="flex flex-col flex-grow">
          <TabView className="flex-grow w-full md:w-[800px]">
            <TabPanel header="Non Duplicate Attendance">
              <TabView className="flex-grow w-full md:w-[800px]">
                <TabPanel header="Full Name List">
                  <div className="p-fluid">
                    <DataTable
                      value={imageList}
                      className="p-datatable-striped"
                    >
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
                            {moment(rowData.insert_date).format(
                              "DD MMM YYYY h:mm A"
                            )}
                          </span>
                        )}
                        style={{ minWidth: "150px" }}
                      />
                      <Column
                        header=""
                        body={(rowData) => (
                          <Button
                            className="p-button-text"
                            onClick={(event) =>
                              handleImageClick(rowData, event)
                            }
                            icon="pi pi-ellipsis-h"
                          />
                        )}
                        style={{ minWidth: "10px" }}
                      />
                    </DataTable>
                  </div>
                </TabPanel>
                <TabPanel header="Check In">
                  <div className="grid p-4">
                    <EmployeeInput title="Check In" description={<></>} />
                  </div>
                </TabPanel>
                <TabPanel header="Spin N Win">
                  <div className="grid p-4">
                    <EmployeeInput
                      title="Welcome to Spin N Win!"
                      description={
                        <>
                          Spin the wheel and stand a chance to win exciting
                          prizes like a Car, Vacation, Gift Cards, and more!
                          Click the button or use <kbd>Ctrl</kbd> +{" "}
                          <kbd>Enter</kbd> to spin.
                        </>
                      }
                    />
                    <div className="col-12 md:col-6 flex justify-content-center align-items-center">
                      <SpinWheel
                        initialPrizes={[
                          "Car",
                          "Vacation",
                          "Gift Card",
                          "TV",
                          "Headphones",
                          "Laptop",
                          "Smartphone",
                          "Watch",
                          "Bicycle",
                          "Mystery Box",
                          "HP Pro Book",
                          "Samsung Galaxy S24 FE",
                          "Huawei Watch",
                        ]}
                      />
                    </div>
                  </div>
                </TabPanel>
              </TabView>
            </TabPanel>
            <TabPanel header="Attendance">
              <TabView className="flex-grow w-full md:w-[800px]">
                <TabPanel header="Attendance Sign In">
                  <div className="grid p-4">
                    <EmployeeInput
                      title="Attendance Sign In"
                      description={<></>}
                    />
                  </div>
                </TabPanel>
                <TabPanel header="Attendance List">
                  <div className="p-fluid">
                    <DataTable
                      value={imageList}
                      className="p-datatable-striped"
                    >
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
                            {moment(rowData.insert_date).format(
                              "DD MMM YYYY h:mm A"
                            )}
                          </span>
                        )}
                        style={{ minWidth: "150px" }}
                      />
                      <Column
                        header=""
                        body={(rowData) => (
                          <Button
                            className="p-button-text"
                            onClick={(event) =>
                              handleImageClick(rowData, event)
                            }
                            icon="pi pi-ellipsis-h"
                          />
                        )}
                        style={{ minWidth: "10px" }}
                      />
                    </DataTable>
                  </div>
                </TabPanel>
              </TabView>
            </TabPanel>
            <TabPanel header="Settings">
              <div className="p-fluid">
                <UploadDownload fetchData={fetchData} />
              </div>
            </TabPanel>
          </TabView>
        </div>
      </div>
    </LoadingProvider>
  );
};

export default Scan;
