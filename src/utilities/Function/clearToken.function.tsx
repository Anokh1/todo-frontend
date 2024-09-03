import { TODO_TOKEN } from "utilities/Constant/localStorageName.constant";

export const ClearToken = () => {
  localStorage.removeItem(TODO_TOKEN);
};
