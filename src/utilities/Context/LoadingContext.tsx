import { createContext, useContext, useRef, useState } from "react";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";

interface LoadingContextProps {
  startLoading: () => void;
  stopLoading: () => void;
}

const LoadingContext = createContext<LoadingContextProps | undefined>(
  undefined
);

const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<LoadingBarRef>(null);
  const [loading, setLoading] = useState(false);

  const startLoading = () => {
    ref.current?.continuousStart();
    setLoading(true);
  };

  const stopLoading = () => {
    ref.current?.complete();
    setLoading(false);
  };

  return (
    <LoadingContext.Provider value={{ startLoading, stopLoading }}>
      <LoadingBar color="#9DBDFF" ref={ref} />
      {children}
    </LoadingContext.Provider>
  );
};

const useLoading = (): LoadingContextProps => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

export { LoadingProvider, useLoading };
