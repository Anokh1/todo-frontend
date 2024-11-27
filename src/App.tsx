import Admin from "pages/Admin";
import NAS from "pages/NAS";
import Todo from "pages/Todo";
import { Route, Routes } from "react-router-dom";
import "./App.css";

const App = (props: any) => {
  return (
    <div className="app-container">
      {/* <AppMenu /> */}
      <div>
        <Routes>
          {/* <Route path="/" element={}/> */}
          <Route path="/todo" element={<Todo />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/nas" element={<NAS />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
4;
