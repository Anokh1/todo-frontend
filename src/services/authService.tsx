// // authService.tsx

// import Axios from "axios";
// import { useState } from "react";

// interface User {
//   id: string;
//   email: string;
//   // Add other relevant user properties
// }

// export const useAuth = () => {
//   const [user, setUser] = useState<User | null>(null);

//   const login = async (email: string, password: string) => {
//     // Call your backend API to authenticate user
//     // Example:
//     // const response = await fetch('/login', {
//     //   method: 'POST',
//     //   body: JSON.stringify({ email, password }),
//     //   headers: {
//     //     'Content-Type': 'application/json'
//     //   }
//     // });
//     // if (response.ok) {
//     //   const user = await response.json();
//     //   setUser(user);
//     //   return user;
//     // } else {
//     //   throw new Error('Login failed');
//     // }
//     return Axios.post("http://localhost:3002/api/login", {
//       email: email,
//       password: password,
//     })
//       .then((response) => {
//         const user = response.data;
//         setUser(user);
//         return user;
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     // if (email && password !== "") {

//     // }
//   };

//   const logout = () => {
//     // Clear user from state
//     setUser(null);
//   };

//   return { user, login, logout };
// };

// authService.tsx

import Axios from "axios";
import { useState } from "react";

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
    console.log(user); 
    return user;
  } catch (error) {
    console.log(error);
    throw new Error('Login failed');
  }
};

