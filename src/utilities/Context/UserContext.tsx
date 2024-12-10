import { useLoading } from "context/LoadingContext";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "services/user.service";
import { callApi } from "utilities/Function/callApi.function";
import { ClearToken } from "utilities/Function/clearToken.function";
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
  const userService = new UserService();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // const { startLoading, stopLoading } = useLoading();

  const [user, setUser] = useState<any>(null);

  // const navigateToLogin = () => {
  //   // window.location.href = `${config.hostname}:${config.backend_port}/login`;
  //   navigate("/login");
  // };

  // useEffect(() => {
  //   if (getToken()) {
  //     let apiFunc = userService.getOneUser;
  //     startLoading();

  //     callApi({
  //       apiFunc,
  //       setLoading,
  //       navigateToLogin: () => {
  //         navigateToLogin();
  //       },
  //     }).then((res: any) => {
  //       if (res.status) {
  //         if (!res.data) {
  //           ClearToken();
  //           navigateToLogin();
  //           return;
  //         }
  //         if (res.data.isActive === 0) {
  //           ClearToken();
  //           navigateToLogin();
  //           return;
  //         }
  //         setUser(res.data);
  //       }
  //     });
  //     stopLoading();
  //   } else {
  //     navigateToLogin();
  //   }
  // }, [getToken()]);

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
