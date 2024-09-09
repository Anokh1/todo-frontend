import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import TodoService from "services/todo.service";
import { callApi } from "utilities/Function/callApi.function";
import { showSuccessToast } from "utilities/Function/customToast.function";
import { InputText } from "primereact/inputtext";
import FormError from "utilities/Form/FormError";
import { Button } from "primereact/button";

interface TodoFormProps {
  isEdit?: boolean;
  selectedTodo: any;
  setVisibleAddTodoDialog?: React.Dispatch<React.SetStateAction<boolean>>;
  setVisibleEditTodoDialog?: React.Dispatch<React.SetStateAction<boolean>>;
  callGetTodoList?: () => void;
}

const TodoForm = ({
  isEdit,
  selectedTodo,
  setVisibleAddTodoDialog,
  setVisibleEditTodoDialog,
  callGetTodoList,
}: TodoFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formikInitialValues, setFormikInitialValues] = useState<any>({
    title: "",
    description: "",
  });
  const todoService = new TodoService();

  useEffect(() => {
    if (selectedTodo) {
      setFormikInitialValues({
        title: selectedTodo.title,
        description: selectedTodo.description,
      });
    }
  }, [selectedTodo]);

  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={formikInitialValues}
        validationSchema={Yup.object({
          title: Yup.string().required("Title is required"),
          description: Yup.string().required("Description is required"),
        })}
        onSubmit={(values: any) => {
          let apiFunction;
          let data: any = {
            title: values.title,
            description: values.description,
          };
          if (isEdit) {
            apiFunction = todoService.updateTodo;
            data = { ...data, id: selectedTodo.id };
          } else {
            apiFunction = todoService.createTodo;
          }

          callApi({ apiFunction, setLoading }, data).then((res: any) => {
            if (res.status) {
              setVisibleAddTodoDialog?.(false);
              setVisibleEditTodoDialog?.(false);
              callGetTodoList?.();
              showSuccessToast(res.message);
            }
          });
        }}
      >
        {(props: any) => {
          return (
            <Form style={{ padding: "0px 10px 0px 10px" }}>
              <div className="grid col-12">
                <div className="p-inputgroup">
                  <InputText
                    id="title"
                    name="title"
                    value={props.values.title}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    placeholder="Title"
                  />
                </div>
                <FormError
                  touched={props?.touched?.title}
                  errors={props?.errors?.title}
                />
              </div>
              <hr />
              <div className="grid col-12">
                <div className="p-inputgroup">
                  <InputText
                    id="description"
                    name="description"
                    value={props.values.title}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    placeholder="Description"
                  />
                </div>
                <FormError
                  touched={props?.touched?.description}
                  errors={props?.errors?.description}
                />
              </div>
              <hr />
              <div className="text-right">
                <Button
                  type="submit"
                  severity="success"
                  label={isEdit ? "Update" : "Create"}
                  icon={`pi pi-${isEdit ? "check" : "plus"}-circle`}
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default TodoForm;
