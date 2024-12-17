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
import { useEffect, useRef, useState } from "react";
import FileService from "services/file.service";
import { ImageFile } from "utilities/Interface/AdminInterface";
import SpinWheel from "./component/SpinWheel";
import EmployeeInput from "./component/EmployeeInput";
import UploadDownload from "./component/UploadDownload";
import ScanService from "services/scan.service";
import { showError } from "utilities/Function/toast.function";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";

const Scan: React.FC = () => {
  // const { startLoading, stopLoading } = useLoading();
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [globalFilter, setGlobalFilter] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const toastRef = useRef<Toast>(null);
  const [nameList, setNameList] = useState([]);
  const [prizeList, setPrizeList] = useState([]);

  const scanService = new ScanService();

  const fetchNameList = async () => {
    try {
      const res = await scanService.getData("name_list");
      setNameList(res.data);
    } catch (error) {
      showError(toastRef, "Access Card and ID column cannot be empty");
    }
  };

  const fetchPrizeList = async () => {
    try {
      const res = await scanService.getData("prize");
      setPrizeList(res.data);
    } catch (error) {
      showError(toastRef, "Prize list cannot be empty");
    }
  };

  useEffect(() => {
    fetchNameList();
    fetchPrizeList();
  }, []);

  const renderTimestamp = (rowData: any, column: string) => {
    return rowData[column] ? new Date(rowData[column]).toLocaleString() : "";
  };

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const _filter: any = { ...globalFilter };
    _filter["global"].value = value;

    setGlobalFilter(_filter);
    setGlobalFilterValue(value);
  };

  const renderSearchHeader = () => {
    return (
      <div className="flex justify-content-end">
        <span className="p-input-icon-right w-full md:w-20rem">
          <i className="pi pi-search" />
          <InputText
            type="text"
            value={globalFilterValue}
            onChange={(e) => onGlobalFilterChange(e)}
            placeholder="Search Employee"
          />
        </span>
      </div>
    );
  };

  return (
    <LoadingProvider>
      <Toast ref={toastRef} />
      <div className="flex flex-column min-h-screen p-4">
        <div className="flex flex-col flex-grow">
          <TabView className="flex-grow w-full md:w-[800px]">
            <TabPanel header="Non Duplicate Attendance">
              <TabView className="flex-grow w-full md:w-[800px]">
                <TabPanel header="Full Name List">
                  <div className="p-fluid">
                    <DataTable
                      value={nameList}
                      header={renderSearchHeader}
                      paginator
                      rows={30}
                      selectionMode="single"
                      filters={globalFilter}
                      onFilter={(e: any) => setGlobalFilter(e.filters)}
                      globalFilterFields={[
                        "Access Card",
                        "ID",
                        "Name",
                        "Department",
                      ]}
                      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} names"
                      emptyMessage="No record found."
                      scrollable
                      className="p-datatable-striped"
                    >
                      <Column field="Access Card" header="Access Card" />
                      <Column field="ID" header="ID" />
                      <Column field="Name" header="Name" />
                      <Column field="Department" header="Department" />
                      <Column
                        field="Check In"
                        header="Check In"
                        body={(rowData) => renderTimestamp(rowData, "Check In")}
                      />
                      <Column
                        field="Collection Door Gift"
                        header="Collection Door Gift"
                        body={(rowData) =>
                          renderTimestamp(rowData, "Collection Door Gift")
                        }
                      />
                      <Column
                        field="Spin & Win"
                        header="Spin & Win"
                        body={(rowData) =>
                          renderTimestamp(rowData, "Spin & Win")
                        }
                      />
                      <Column field="Prize Won" header="Prize Won" />
                      <Column
                        field="Tab 1"
                        header="T1"
                        body={(rowData) => renderTimestamp(rowData, "Tab 1")}
                      />
                      <Column
                        field="Tab 2"
                        header="T2"
                        body={(rowData) => renderTimestamp(rowData, "Tab 2")}
                      />
                      <Column
                        field="Tab 3"
                        header="T3"
                        body={(rowData) => renderTimestamp(rowData, "Tab 3")}
                      />
                      <Column
                        field="Tab 4"
                        header="T4"
                        body={(rowData) => renderTimestamp(rowData, "Tab 4")}
                      />
                      <Column
                        field="Tab 5"
                        header="T5"
                        body={(rowData) => renderTimestamp(rowData, "Tab 5")}
                      />
                    </DataTable>
                  </div>
                </TabPanel>
                <TabPanel header="Check In">
                  <div className="grid p-4">
                    <EmployeeInput
                      title="Check In"
                      description={<></>}
                      type="attendance"
                      nameList={nameList}
                      onFetchData={fetchNameList}
                    />
                  </div>
                </TabPanel>
                <TabPanel header="Collection Door Gift">
                  <div className="grid p-4">
                    <EmployeeInput
                      title="Collection Door Gift"
                      description={<></>}
                      type="attendance"
                      nameList={nameList}
                      onFetchData={fetchNameList}
                    />
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
                      type="attendance"
                      nameList={nameList}
                      onFetchData={fetchNameList}
                    />
                    <div className="col-12 md:col-6 flex justify-content-center align-items-center">
                      <SpinWheel
                        prizeList={prizeList}
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
                      type="attendance"
                      nameList={nameList}
                      onFetchData={fetchNameList}
                    />
                  </div>
                </TabPanel>
                <TabPanel header="Attendance List">
                  <div className="p-fluid">
                    <DataTable
                      // value={imageList}
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
                      {/* <Column
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
                      /> */}
                    </DataTable>
                  </div>
                </TabPanel>
              </TabView>
            </TabPanel>
            <TabPanel header="Settings">
              <div className="p-fluid">
                <UploadDownload
                  fetchName={fetchNameList}
                  fetchPrize={fetchPrizeList}
                  fetchNameList={fetchNameList}
                />
              </div>
            </TabPanel>
          </TabView>
        </div>
      </div>
    </LoadingProvider>
  );
};

export default Scan;
