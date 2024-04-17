import Axios from "axios";

interface User {
  id: string;
  email: string;
  // Add other relevant user properties
}

// export const login = async (email: string, password: string): Promise<User | any[]> => {
export const login = async (
  email: string,
  password: string
): Promise<any[]> => {
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
      ];
      console.log(userArray);
    }
    // const user = response.data.data.email;
    // const user = response.data.data.token;
    return userArray;
  } catch (error) {
    console.log(error);
    throw new Error("Login failed");
  }
};
