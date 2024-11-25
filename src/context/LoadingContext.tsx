import React, { useContext, createContext, ReactNode, useRef } from "react";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";

interface LoadingContextProps {
  startLoading: () => void;
  stopLoading: () => void;
}

const LoadingContext = createContext<LoadingContextProps | undefined>(
  undefined
);

const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const ref = useRef<LoadingBarRef>(null);

  const startLoading = () => {
    ref.current?.continuousStart();
  };

  const stopLoading = () => {
    ref.current?.complete();
  };

  return (
    <React.Fragment>
      <LoadingContext.Provider value={{ startLoading, stopLoading }}>
        <LoadingBar color="#3D3BF3" ref={ref} style={{ height: "3px" }} />
        {children}
      </LoadingContext.Provider>
    </React.Fragment>
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
