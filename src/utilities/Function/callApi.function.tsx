import { ClearToken } from "./clearToken.function";
import { VerifyToken } from "./verifyToken.function";

interface CallApiProps<T> {
  apiFunction: (...args: any[]) => Promise<T>;
  setLoading?: (loading: boolean) => void;
  navigateToLogin?: () => void;
}

export function callApi<T>(
  { apiFunction, setLoading, navigateToLogin }: CallApiProps<T>,
  ...args: any[]
): Promise<T> {
  if (setLoading) {
    setLoading(true);
  }
  return apiFunction(...args)
    .then((res: any) => {
      if (setLoading) {
        setLoading(false);
      }
      if (res.verifyToken === false) {
        VerifyToken();
        ClearToken();
        if (navigateToLogin) {
          navigateToLogin();
        }
      }
      return res;
    })
    .catch((err: Error) => {
      if (setLoading) {
        setLoading(false);
      }
      return { message: err.message, status: false };
    });
}
