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

interface FileItem {
  name: string;
}

interface FileResponse {
  data: string[]; // Adjust to match the structure of the data returned from the backend
  message: string;
  status: boolean;
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

// type FileList = FileResponse[];

type FileList = string[];

// type DateList = DateItem[];

type DateList = { [date: string]: string[] };

export const getTodo = (list: (data: TodoList) => void) => {
  Axios.get("http://localhost:3002/api/read").then((response) => {
    list(response.data.data);
  });
};

export const getDates = (list: (data: DateList) => void) => {
  Axios.get("http://localhost:3002/api/dates").then((response) => {
    list(response.data);
  });
};

export const getExcelFile = (list: (data: FileList) => void) => {
  Axios.get("http://localhost:3002/api/readFiles").then((response) => {
    list(response.data.data);
  });
};

export const countStatus = ({ value }: CountStatusProps): Promise<number> => {
  return new Promise((resolve, reject) => {
    Axios.get(
      `http://localhost:3002/api/status?status=${encodeURIComponent(value)}`
    )
      .then((response) => {
        const count = response.data.data;
        resolve(count);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const findTodo = async (title: string) => {
  try {
    const url = `http://localhost:3002/api/find?title=${encodeURIComponent(
      title
    )}`;
    const response = await Axios.get(url);
    // console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching todo:", error);
    return []; // Return an empty array in case of an error
  }
};

export const verifyID = async (id: number) => {
  try {
    const response = await Axios.get(`http://localhost:3002/api/verifyID?id=${encodeURIComponent(
      id)}`, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("jwt"),
      },
    });
    // console.log(response.data.data); 
    return response.data;
  } catch (error) {
    return error;
  }
};
