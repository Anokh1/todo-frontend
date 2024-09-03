import { TODO_TOKEN } from "utilities/Constant/localStorageName.constant";

export const getToken = () => {
  return localStorage.getItem(TODO_TOKEN);
};
