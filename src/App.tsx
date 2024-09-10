import Todo from "pages/Todo";
import { Route, Routes } from "react-router-dom";
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import "./App.css";

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
