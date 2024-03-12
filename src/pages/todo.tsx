import React, { useState, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Navbar from "../components/navbar";
import { getTodo } from "../services/read";
import { updateStatus, updateTodo } from "../services/update";
import { deleteTodo } from "../services/delete";

interface TodoItem {
  id: number;
  name: string;
  title: string;
  description: string;
  done: boolean;
  createdDate: Date;
}

export default function Todo() {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  const [updateID, setUpdateID] = useState(0);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const toastRef = useRef<Toast>(null);

  const [visible, setVisible] = useState(false);

  const handleUpdateStatus = (id: number, done: boolean) => {
    updateStatus({ id, done });
    setTimeout(function () {
      getTodo(setTodoList);
    }, 300);
  };

  const getTitle = (id: number) => {
    var elementPos = todoList
      .map(function (x) {
        return x.id;
      })
      .indexOf(id);
    var objectFound = todoList[elementPos].id;
    setVisible(true);
    setUpdateID(objectFound);
    setNewTitle(todoList[elementPos].title);
    setNewDescription(todoList[elementPos].description);
  };

  const handleUpdateTodo = (id: number, title: string, description: string) => {
    updateTodo({ id, title, description });
    if (toastRef.current != null) {
      toastRef.current.show({
        severity: "success",
        summary: "Information Updated",
      });
      setTimeout(function () {
        setVisible(false);
        // clearField();
        getTodo(setTodoList);
      }, 100);
    }
  };

  const handleDeleteTodo = (id: number) => {
    deleteTodo({ id });
    setTodoList(
      todoList.filter((val) => {
        return val.id !== id;
      })
    );
    if (toastRef.current != null) {
      toastRef.current.show({
        severity: "warn",
        summary: "Information removed",
      });
    }
  };

  useEffect(() => {
    getTodo(setTodoList);
  }, []);

  return (
    <div>
      <Toast ref={toastRef}></Toast>
      <Navbar />
      <div>
        {todoList.map((val, key) => {
          return (
            <div
              key={key}
              className="card flex justify-content-center todoCard"
            >
              <Card
                title={val.title}
                subTitle={
                  "Created by " +
                  val.name +
                  " on " +
                  new Date(val.createdDate).toDateString()
                }
                className="md:w-25rem"
              >
                <p className="m-0">{val.description}</p>
                <Button
                  onClick={() => handleUpdateStatus(val.id, val.done)}
                  label={val.done === false ? "Done" : "Completed"}
                  icon={
                    val.done === false ? "pi pi-check" : "pi pi-thumbs-up-fill"
                  }
                  disabled={val.done === true ? true : false}
                />
                <Button
                  onClick={() => handleDeleteTodo(val.id)}
                  label="Delete"
                  severity="secondary"
                  icon="pi pi-times"
                  style={{ marginLeft: "0.5em" }}
                />
                <Button
                  onClick={() => getTitle(val.id)}
                  label="Update"
                  severity="help"
                  icon="pi pi-pencil"
                  hidden={val.done === true ? true : false}
                  disabled={val.done === true ? true : false}
                  style={{
                    marginLeft: "0.5em",
                    visibility: val.done === true ? "hidden" : "visible",
                  }}
                />
                <Dialog
                  header="Update Todo"
                  visible={visible}
                  onHide={() => setVisible(false)}
                >
                  <div className="updateBox">
                    <InputText
                      defaultValue={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      style={{ marginBottom: "1em" }}
                    />
                    <InputText
                      defaultValue={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      style={{ marginBottom: "1em" }}
                    />
                    <Button
                      onClick={() =>
                        handleUpdateTodo(updateID, newTitle, newDescription)
                      }
                      label="Submit"
                      severity="warning"
                      icon="pi pi-check"
                      style={{ marginLeft: "0.5em" }}
                    />
                  </div>
                </Dialog>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
