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

export const updateStatus = ({ id, done }: UpdateStatusProps) => {
  // getDate(id);
  if (done == false) {
    Axios.put("http://localhost:3002/api/updateDone", { done: true, id });
  }
};

export const updateTodo = ({ id, title, description }: UpdateTodoProps) => {
  Axios.put("http://localhost:3002/api/updateTodo", {
    id: id,
    title: title,
    description: description,
  });
};
