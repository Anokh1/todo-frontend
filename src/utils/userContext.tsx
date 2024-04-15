import React, { ReactNode, createContext, useContext, useState } from "react";

// Define a context interface
interface UserContextType {
  userEmail: string;
  userId: string;
  setUser: (email: string, id: string) => void;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

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

// Provider component to wrap your app and provide the context value
export const UserContextProvider: React.FC<UserContextProps> = ({
  children,
}) => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  // Function to set user email and ID
  const setUser = (email: string, id: string) => {
    setUserEmail(email);
    setUserId(id);
  };

  // Context value
  const contextValue: UserContextType = {
    userEmail,
    userId,
    setUser,
  };

  // Provide the context value to its children
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
