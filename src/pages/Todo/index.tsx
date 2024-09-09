import { DataTableFilterMeta } from "primereact/datatable";
import { FilterMatchMode } from "primereact/api";
import { useEffect, useState } from "react";
import TodoService from "services/todo.service";
import { MenuItem } from "primereact/menuitem";
import { confirmDialog } from "primereact/confirmdialog";
import { callApi } from "utilities/Function/callApi.function";
import { showSuccessToast } from "utilities/Function/customToast.function";
import MediaQuery from "utilities/Function/mediaQuery.function";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

const Todo = () => {
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
          <InputText type="search" value={globalFilterValue} onChange={(e) => onGlobalFilterChange} />
        </span>
      </div>
    );
  };
};
