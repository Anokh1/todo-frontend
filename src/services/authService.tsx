import Axios from "axios";

export const login = async (
  email: string,
  password: string
): Promise<string[]> => {
  var userArray = [];
  try {
    const response = await Axios.post("http://localhost:3002/api/login", {
      email: email,
      password: password,
    });

    if (
      response.data.message === "Incorrect password" ||
      response.data.message === "User not found"
    ) {
      userArray = [response.data.message];
    } else {
      userArray = [
        response.data.data.email,
        response.data.data.id,
        response.data.data.token,
        response.data.data.username,
      ];
      // console.log(userArray);
    }
    return userArray;
  } catch (error) {
    throw new Error("Login failed");
  }
};

// interface RegisterProps {
// email: string;
// firstName: string;
// lastName: string;
// age: number;
// password: string;
// }

export const register = async (
  email: string,
  firstName: string,
  lastName: string,
  age: number,
  password: string
): Promise<string> => {
  try {
    const response = await Axios.post("http://localhost:3002/api/register", {
      email: email,
      firstName: firstName,
      lastName: lastName,
      age: age,
      password: password,
    });

    if (response.data.status) {
      return response.data.message;
    } else {
      return response.data.message;
    }
  } catch (error) {
    throw new Error("Register failed");
  }
};
