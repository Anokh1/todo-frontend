import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { FilterMatchMode } from "primereact/api";
import { useEffect, useRef, useState } from "react";
import TodoService from "services/todo.service";
import { MenuItem } from "primereact/menuitem";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { callApi } from "utilities/Function/callApi.function";
import { showSuccessToast } from "utilities/Function/customToast.function";
import MediaQuery from "utilities/Function/mediaQuery.function";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { onGlobalFilterChange } from "utilities/Function/onGlobalFilterChange.function";
import { Menu } from "primereact/menu";
import { Dialog } from "primereact/dialog";
import TodoForm from "./form/TodoForm";
import { Column } from "primereact/column";

const Todo = () => {
  const menuAction = useRef<Menu>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [todoList, setTodoList] = useState<any>([]);
  const [selectedTodo, setSelectedTodo] = useState<any>();
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [smallScreen, setSmallScreen] = useState<boolean>(false);
  const [visibleAddTodoDialog, setVisibleAddTodoDialog] =
    useState<boolean>(false);
  const [visibleEditTodoDialog, setVisibleEditTodoDialog] =
    useState<boolean>(false);
  const todoService = new TodoService();

  const items: MenuItem[] = [
    {
      template: () => {
        return (
          <div className="p-menuitem-content">
            <a
              className="flex align-items-center p-menuitem-link"
              onClick={() => {
                setVisibleEditTodoDialog(true);
              }}
            >
              <span className="pi pi-pencil" style={{ color: "#6A9C89" }} />
              <span className="m1-3">Edit</span>
            </a>
          </div>
        );
      },
    },
    {
      template: () => {
        return (
          <div className="p-menuitem-content">
            <a
              className="flex align-items-center p-menuitem-link"
              onClick={() => {
                confirmDialog({
                  message: `Are you sure you want to delete this todo: ${selectedTodo?.title} ?`,
                  header: "Delete Confirmation",
                  icon: "pi pi-exclamation-triangle",
                  accept: () => {
                    callApi(
                      { apiFunction: todoService.deactivateTodo, setLoading },
                      { id: selectedTodo?.id }
                    ).then((res: any) => {
                      if (res.status) {
                        callGetTodoList();
                        showSuccessToast(res.message);
                      }
                    });
                  },
                  reject: () => {},
                });
              }}
            >
              <span className="pi pi-pencil" style={{ color: "#C7253E" }} />
              <span className="m1-3">Delete</span>
            </a>
          </div>
        );
      },
    },
  ];

  MediaQuery("(min-width: 768px)", (matches: any) => {
    setSmallScreen(!matches);
  });

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      callGetTodoList();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const callGetTodoList = () => {
    callApi({ apiFunction: todoService.getTodo, setLoading }, filters).then(
      (res: any) => {
        if (res.status) {
          setTodoList(res.data);
        }
      }
    );
  };


  const renderHeader = () => {
    return (
      <div className="flex align-items-center justify-content-between">
        <Button
          icon="pi pi-plus-circle"
          label="Create Todo"
          className="mr-2"
          onClick={(e) => {
            setVisibleAddTodoDialog(true);
          }}
          loading={loading}
        />
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            value={globalFilterValue}
            onChange={(e) =>
              onGlobalFilterChange({
                e,
                filters,
                setFilters,
                setGlobalFilterValue,
              })
            }
            placeholder="Search"
            disabled={loading}
          />
        </span>
      </div>
    );
  };

  return (
    <div>
      <ConfirmDialog />
      <Menu model={items} popup ref={menuAction} id="popup_menu" />
      <Dialog
        header="Create Todo"
        visible={visibleAddTodoDialog}
        style={{ width: smallScreen ? "90vw" : "70vw" }}
        onHide={() => {
          if (!visibleAddTodoDialog) return;
          setVisibleAddTodoDialog(false);
        }}
      >
        <div>
          <TodoForm
            setVisibleAddTodoDialog={setVisibleAddTodoDialog}
            isEdit={false}
            callGetTodoList={callGetTodoList}
          />
        </div>
      </Dialog>
      <Dialog
        header={`Edit ${selectedTodo?.title}`}
        visible={visibleEditTodoDialog}
        style={{ width: smallScreen ? "90vw" : "70vw" }}
        onHide={() => {
          if (!visibleEditTodoDialog) return;
          setVisibleEditTodoDialog(false);
        }}
      >
        <div>
          <TodoForm
            selectedTodo={selectedTodo}
            setVisibleEditTodoDialog={setVisibleEditTodoDialog}
            isEdit={true}
            callGetTodoList={callGetTodoList}
          />
        </div>
      </Dialog>

      <div className="card">
        <DataTable
          sortMode="single"
          header={renderHeader()}
          filters={filters}
          value={todoList}
          paginator
          stripedRows
          rows={10}
          loading={loading}
          globalFilterFields={["title", "description"]}
          emptyMessage="No data found"
        >
          <Column field="title" header="Title" sortable />
          <Column field="description" header="Description" sortable />
          {/* <Column field="insert_date" header="Create Date" sortable bodyStyle={(rowData: any) => DateTimeTemplate(rowData, "insert_date")} */}

          <Column
            body={(rowData) => (
              <Button
                icon="pi pi-ellipsis-h"
                rounded
                text
                onClick={(e) => {
                  setSelectedTodo(rowData);
                  menuAction.current?.toggle(e);
                }}
                aria-controls="popup_menu"
                aria-haspopup
              />
            )}
          />
        </DataTable>
      </div>
    </div>
  );
};

export default Todo;
