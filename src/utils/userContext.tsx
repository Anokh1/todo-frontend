import React, { ReactNode, createContext, useContext, useState } from "react";
// import jwtDecode from 'jwt-decode';
import Cookies from "universal-cookie";
import * as jwt_decode from "jwt-decode";
// const jwtDecode = require("jwt-decode");
// import jwt from "jsonwebtoken";

// Define a context interface
interface UserContextType {
  userEmail: string;
  userId: string;
  userName: string;
  setUser: (email: string, id: string, username: string) => void;
  clearUser: () => void;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

const cookies = new Cookies();

// Custom hook for consuming the context
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};

interface UserContextProps {
  children: ReactNode; // ReactNode is a type that represents any JSX element
}

var email = "";
var id = "";

const token = cookies.get("jwt");

console.log(email, id);

// Provider component to wrap your app and provide the context value
export const UserContextProvider: React.FC<UserContextProps> = ({
  children,
}) => {
  if (token) {
    // const decodedToken: any = jwt.decode(token);
    const decodedToken= jwt_decode(token); 
    email = decodedToken.email;
    id = decodedToken.id;
  }

  const [userEmail, setUserEmail] = useState<string>(email);
  const [userId, setUserId] = useState<string>(id);
  const [userName, setUserName] = useState<string>("");

  // Function to set user email and ID
  const setUser = (email: string, id: string, username: string) => {
    setUserEmail(email);
    setUserId(id);
    setUserName(username);
  };

  const clearUser = () => {
    setUserEmail("");
    setUserId("");
    setUserName("");
  };

  // Context value
  const contextValue: UserContextType = {
    userEmail,
    userId,
    userName,
    setUser,
    clearUser,
  };

  // Provide the context value to its children
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
