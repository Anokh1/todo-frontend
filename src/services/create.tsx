import Axios from "axios";
import { getToken } from "./localStorageService";

interface AddTodoProps {
  name: string;
  title: string;
  description: string;
  done: number;
}

export const addTodo = ({ name, title, description, done }: AddTodoProps) => {
  // console.log(name, title);
  if (name !== "" && title !== "") {
    return Axios.post(
      "http://localhost:3002/api/create",
      {
        name: name,
        title: title,
        description: description,
        done: done,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("jwt"),
        },
      }
    ).then(() => {
      console.log("Create success");
    });
  } else {
    console.log("Create error");
    return Promise.reject("Invalid name or title");
  }
};


