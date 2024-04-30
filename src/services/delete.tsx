import Axios from "axios";

interface DeleteStatusProps {
  id: number;
}

export const deleteTodo = async ({ id }: DeleteStatusProps) => {
  // Axios.delete(`http://localhost:3002/api/delete/${id}`);
  const response = await Axios.delete(
    `http://localhost:3002/api/delete?id=${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("jwt"),
      },
    }
  );
  return response.data;
};
