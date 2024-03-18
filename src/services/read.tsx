import Axios from "axios";

// Define an interface to describe the structure of the todo item
interface TodoItem {
  id: number;
  name: string;
  title: string;
  description: string;
  done: boolean;
  createdDate: Date;
}

// interface DateItem {
//   date: string; 
// }

interface CountStatusProps {
  value: number;
  // count: number;
}

// Define an interface for the array of todo items
type TodoList = TodoItem[];

// type DateList = DateItem[]; 

type DateList = { [date: string]: string[] };


export const getTodo = (list: (data: TodoList) => void) => {
  Axios.get("http://localhost:3002/api/read").then((response) => {
    list(response.data);
  });
};

export const getDates = (list: (data: DateList) => void) => {
  Axios.get("http://localhost:3002/api/dates").then((response) => {
    list(response.data);
  });
};

export const countStatus = ({ value }: CountStatusProps): Promise<number> => {
  return new Promise((resolve, reject) => {
    Axios.get(
      `http://localhost:3002/api/status?status=${encodeURIComponent(value)}`
    )
      .then((response) => {
        const count = response.data.result;
        resolve(count);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const findTodo = async (title: string) => {
  try {
      const url = `http://localhost:3002/api/find?title=${encodeURIComponent(title)}`;
      const response = await Axios.get(url);
      // console.log(response.data);
      return response.data;
  } catch (error) {
      console.error('Error fetching todo:', error);
      return []; // Return an empty array in case of an error
  }
};
