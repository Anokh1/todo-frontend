import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "utilities/Function/getToken.function";

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
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (getToken()) {
        setLoading(false);
      } else {
        navigate("/login");
      }
    };
    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
