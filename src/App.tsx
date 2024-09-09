import React from "react";
import "./App.css";
import AppInlineMenu from "./AppInlineMenu";
import AppMenu from "./AppMenu";
import { Route, Routes } from "react-router-dom";
import Todo from "pages/Todo";

const App = (props: any) => {
  return (
    <div className="app-container">
      {/* <AppMenu /> */}
      <div>
        <Routes>
          {/* <Route path="/" element={}/> */}
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
4;
