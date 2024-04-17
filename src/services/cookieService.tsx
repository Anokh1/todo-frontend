import Cookies from "universal-cookie";

const cookies = new Cookies();

export const setAuthTokenCookie = (token: string) => {
  cookies.set("authToken", token, { path: "/" }); // Change 'authToken' to whatever key you prefer
};

export const getAuthTokenFromCookie = () => {
  return cookies.get("authToken");
};

export const removeAuthTokenCookie = () => {
  cookies.remove("authToken");
};
