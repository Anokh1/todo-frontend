import Todo from "pages/Todo";
import { Route, Routes } from "react-router-dom";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import "./App.css";
import STL from "pages/STL";

const App = (props: any) => {
  return (
    <div className="app-container">
      {/* <AppMenu /> */}
      <div>
        <Routes>
          {/* <Route path="/" element={}/> */}
          <Route path="/todo" element={<Todo />} />
          {/* <Route path="/stl" element={<STL />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
4;
