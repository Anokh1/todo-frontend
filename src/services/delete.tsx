import Axios from "axios";

interface DeleteStatusProps {
  id: number;
}

export const deleteTodo = ({ id }: DeleteStatusProps) => {
  Axios.delete(`http://localhost:3002/api/delete/${id}`);
};
