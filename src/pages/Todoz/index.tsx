import { LoadingProvider, useLoading } from "context/LoadingContext";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Menu } from "primereact/menu";
import React, { useEffect, useRef, useState } from "react";
import TodoService from "services/todo.service";
import { getDateRangePeriod } from "utilities/Function/getDateRangePeriod.function";

const Todo: React.FC = () => {
//   const { startLoading, stopLoading } = useLoading();
  const menu = useRef<Menu>(null);
  const [filters, setFilters] = useState<any>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  const [dateRange, setDateRange] = useState<Date[] | null>([
    new Date(new Date().setHours(0, 0, 0, 0)),
    ,
    new Date(new Date().setHours(23, 59, 59, 999)),
  ]);
  const [todos, setTodos] = useState([]);

  const todoService = new TodoService();

  const menuItems = [
    {
      label: "Today",
      icon: "pi pi-calendar",
      command: () => setDateRange(getDateRangePeriod("days", 0)),
    },
    {
      label: "Last 7 Days",
      icon: "pi pi-calendar",
      command: () => setDateRange(getDateRangePeriod("days", 7)),
    },
    {
      label: "Last 1 Month",
      icon: "pi pi-calendar",
      command: () => setDateRange(getDateRangePeriod("months", 1)),
    },
    {
      label: "Last 3 Month",
      icon: "pi pi-calendar",
      command: () => setDateRange(getDateRangePeriod("months", 3)),
    },
    {
      label: "Clear",
      icon: "pi pi-times",
      command: () => setDateRange(null),
    },
  ];

  const fetchTodos = async () => {
    let res;
    if (dateRange && dateRange[0] && !dateRange[1]) {
      return;
    }

    if (dateRange && dateRange[0] && dateRange[1]) {
      const startOfDay = new Date(dateRange[0]);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(dateRange[1]);
      endOfDay.setHours(23, 59, 59, 999);

      res = await todoService.getTodo(startOfDay, endOfDay);
    } else {
      res = await todoService.getTodo();
    }

    if (res.status) {
      setTodos(res.data);
    }
  };

  useEffect(() => {
    // startLoading();
    fetchTodos();
    // stopLoading();
  }, [dateRange]);

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const header = (
    <div
      className="table-header"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
      }}
    >
      <div className="p-inputgroup" style={{ width: "auto" }}>
        <Calendar
          value={dateRange}
          onChange={(e) => setDateRange(e.value as Date[])}
          selectionMode="range"
          readOnlyInput
          placeholder="Select Date Range"
          dateFormat="dd/mm/yy"
        />
        <Button
          icon="pi pi-filter"
          onClick={(e) => menu.current?.toggle(e)}
          aria-controls="popup_menu"
          aria-haspopup
          className="p-button-outlined"
          style={{
            backgroundColor: "transparent",
            color: "#495057",
            border: "1px solid #ced4da",
          }}
        />

        <Menu model={menuItems} popup ref={menu} id="popup_menu" />
      </div>

      <div>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />

          <InputText
            value={globalFilterValue}
            type="search"
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    </div>
  );

  function dateBodyTemplate(rowData: any, arg1: string): React.ReactNode {
    throw new Error("Function not implemented.");
  }

  return (
    <LoadingProvider>
      <React.Fragment>
        <div className="card">
          <DataTable
            value={todos}
            tableStyle={{ minWidth: "50rem" }}
            removableSort
            paginator
            rows={10}
            emptyMessage="No Todo found"
            scrollable
            resizableColumns
            columnResizeMode="fit"
            rowsPerPageOptions={[10, 20, 50]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Activity Log"
            filters={filters}
            globalFilterFields={["ip_address", "page", "action", "description"]}
            header={header}
          >
            <Column
              key="no"
              header="No"
              body={(_, { rowIndex }) => rowIndex + 1}
            />
            {/* <Column field='source' header='Source' sortable /> */}
            <Column field="title" header="Title" sortable />
            <Column field="description" header="Description" sortable />
            <Column
              field="insert_date"
              sortable
              body={(rowData: any) => dateBodyTemplate(rowData, "insert_date")}
              header="Insert Date"
            />
            <Column
              field="update_date"
              sortable
              body={(rowData: any) => dateBodyTemplate(rowData, "update_date")}
              header="Update Date"
            />
          </DataTable>
        </div>
      </React.Fragment>
    </LoadingProvider>
  );
};

export default Todo;
