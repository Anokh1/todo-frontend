import { DataTableFilterMeta } from "primereact/datatable";
import { FilterMatchMode } from "primereact/api";
import { useState } from "react";
import TodoService from "services/todo.service";
import { MenuItem } from "primereact/menuitem";
import { confirmDialog } from "primereact/confirmdialog";
import { callApi } from "utilities/Function/callApi.function";

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
                            // callGetTodoList(); 
                            // showSuccessToast(res.message); 
                        }
                    })
                  },
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
};
