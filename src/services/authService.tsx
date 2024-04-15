import Axios from "axios";

interface User {
  id: string;
  email: string;
  // Add other relevant user properties
}


export const login = async (email: string, password: string): Promise<User> => {
  try {
    const response = await Axios.post("http://localhost:3002/api/login", {
      email: email,
      password: password,
    });
    const user = response.data;
    // console.log(user); 
    return user;
  } catch (error) {
    console.log(error);
    throw new Error('Login failed');
  }
};

