import Axios from "axios";

interface UpdateStatusProps {
  id: number;
  done: boolean;
}

interface UpdateTodoProps {
  id: number;
  title: string;
  description: string;
}

export const updateStatus = async ({ id, done }: UpdateStatusProps) => {
  // getDate(id);
  if (done === false) {
    const response = await Axios.put(
      "http://localhost:3002/api/updateDone",
      { done: true, id },
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("jwt"),
        },
      }
    );
    // console.log(response.data);
    // console.log(response.data.status);
    return response.data;
  }
};

export const updateTodo = ({ id, title, description }: UpdateTodoProps) => {
  Axios.put("http://localhost:3002/api/updateTodo", {
    id: id,
    title: title,
    description: description,
  });
};
