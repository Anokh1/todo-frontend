import { createContext } from "react";

export type UserContextProps = {
  user: {
    id: number;
    first_name: string;
    last_name: string;
    token: string;
    isActive: number;
  };
  setUser: (c: object | null) => void;
};

export const UserContext = createContext<UserContextProps>({
  user: {
    id: 0,
    first_name: "",
    last_name: "",
    token: "",
    isActive: 0,
  },
  setUser: () => {},
});

export const UserContextProvider = ({ children }: any) => {
    
};
