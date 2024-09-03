import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const AppWrapper = (props: any) => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route 
            path="*"
            // element={
            //     <Loading
            // }
        />
      </Routes>
    </>
  );
};
