import Axios from "axios";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface UserContextType {
  userEmail: string;
  userId: string;
  userName: string;
  setUser: (email: string, id: string, username: string) => void;
  clearUser: () => void;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

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

// console.log(email, id);

export const UserContextProvider: React.FC<UserContextProps> = ({
  children,
}) => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("jwt");

      if (!token) {
        // console.error("Token not found");
        return;
      }

      try {
        const response = await Axios.get("http://localhost:3002/api/user", {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        });

        const userData = response.data.data;
        const id = response.data.message;
        const [email, firstName, lastName] = userData.split(" ");
        setUserEmail(email);
        setUserName(`${firstName} ${lastName}`);
        setUserId(id);
      } catch (error) {
        // console.error('Error:', error.message);
      }
    };

    fetchUserData();
  }, []); // Run once on component mount

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
