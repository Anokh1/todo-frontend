import React, { useReducer, createContext, useContext, useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Todo from "./pages/todo";
import Results from "./pages/results";

type Theme = "light" | "dark" | "system";
const ThemeContext = createContext<Theme>("system");

const useGetTheme = () => useContext(ThemeContext);

interface State {
  count: number;
}

type CounterAction =
  | { type: "reset" }
  | { type: "setCount"; value: State["count"] };

const initialState: State = { count: 0 };

function stateReducer(state: State, action: CounterAction): State {
  switch (action.type) {
    case "reset":
      return initialState;
    case "setCount":
      return { ...stateReducer, count: action.value };
    default:
      throw new Error("Unknown Action");
  }
}

interface MyButtonProps {
  /** The text to display inside the button */
  title: string;
  /** Whether the button can be interacted with */
  disabled: boolean;
}

function MyButton({ title, disabled }: MyButtonProps) {
  return <button disabled={disabled}>{title}</button>;
}

function App() {
  const [value, setValue] = useState("Change");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.currentTarget.value);
  }

  const [theme, setTheme] = useState<Theme>("light");

  const [state, dispatch] = useReducer(stateReducer, initialState);

  const addFive = () => dispatch({ type: "setCount", value: state.count + 5 });
  const reset = () => dispatch({ type: "reset" });

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/results" element={<Results />} />
      </Routes>

      {/* <div>
        <h1>Welcome to my app</h1>
        <MyButton title="I'm still a button" disabled={true} />
      </div>

      <div>
        <h1>Welcome to my counter</h1>

        <p>Count: {state.count}</p>
        <button onClick={addFive}>Add 5</button>
        <button onClick={reset}>Reset</button>
      </div>

      <ThemeContext.Provider value={theme}>
        <MyComponent />
      </ThemeContext.Provider>

      <input value={value} onChange={handleChange} />
      <p>Value: {value}</p> */}
    </div>
  );
}

function MyComponent() {
  const theme = useGetTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
    </div>
  );
}

export default App;
