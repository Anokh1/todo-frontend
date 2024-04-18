import Cookies from "universal-cookie";
// import jwtDecode from 'jwt-decode';
const jwtDecode = require('jwt-decode');

const cookies = new Cookies();

export const setAuthTokenCookie = (token: string) => {
  cookies.set("jwt", token, { path: "/" }); // Change 'authToken' to whatever key you prefer
};

export const getAuthTokenFromCookie = () => {
  return cookies.get("jwt");
};

export const removeAuthTokenCookie = () => {
  cookies.remove("jwt");
};

// const token = getAuthTokenFromCookie(); // Retrieve JWT token from cookie

export const decodedToken = (token: string) => {
    console.log(jwtDecode(token));
} 





