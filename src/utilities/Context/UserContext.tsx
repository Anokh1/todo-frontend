import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "services/user.service";
import { useLoading } from "./LoadingContext";

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
  const userService = new UserService();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { startLoading, stopLoading } = useLoading();

  const [user, setUser] = useState<any>(null);
};
