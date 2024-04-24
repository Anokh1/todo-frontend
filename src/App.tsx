import React, { useReducer, createContext, useContext, useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/home";
import Todo from "./pages/todo";
import Results from "./pages/results";
import Upload from "./pages/upload";
import Login from "./pages/login";
import Register from "./pages/register";
import Profile from "./pages/profile";
import PrivateRoute from "./utils/privateRoutes";
import { UserContextProvider, useUserContext } from "./utils/userContext";
import Axios from "axios";

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



// const fetchUserData = async () => {
//   const token = localStorage.getItem("jwt");


//   if (!token) {
//     console.error("Token not found");
//     return;
//   }

//   try {
//     const response = await fetch("http://localhost:3002/api/user", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "x-access-token": token,
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Error fetching user data");
//     }

//     const data = await response.json();
//     console.log("User data:", data);
//   } catch (error) {
//     // console.error('Error:', error.message);
//   }
// };

// fetchUserData();

// function setUser(token: string) {
//   Axios.get("http://localhost:3002/api/user").then((response) => {});
// }

function App() {
  const [value, setValue] = useState("Change");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.currentTarget.value);
  }

  const [theme, setTheme] = useState<Theme>("light");

  const [state, dispatch] = useReducer(stateReducer, initialState);

  const addFive = () => dispatch({ type: "setCount", value: state.count + 5 });
  const reset = () => dispatch({ type: "reset" });


  // fetchUserData();

  return (
    <UserContextProvider>
      <div className="App">
        <Routes>
          <Route
            path="/" // Set the path for the nested routes
            element={<PrivateRoute path={""} element={undefined} />} // Pass the PrivateRoute component as the element
          >
            {" "}
            <Route path="/home" element={<Home />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/todo/:id" element={<Todo />} />
            <Route path="/results" element={<Results />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </UserContextProvider>

    // <div className="App">
    //   <Routes>
    //     <Route path="/login" element={<Login />} />
    //     {/* Other public routes */}
    //     <PrivateRoute path="/home" element={<Home />} />
    //     <PrivateRoute path="/todo" element={<Todo />} />
    //     <PrivateRoute path="/todo/:id" element={<Todo />} />
    //     <PrivateRoute path="/results" element={<Results />} />
    //     <PrivateRoute path="/upload" element={<Upload />} />
    //     <PrivateRoute path="/profile" element={<Profile />} />
    //     <PrivateRoute path="/login" element={<Login />} />
    //     <PrivateRoute path="/register" element={<Register />} />
    //     {/* Other protected routes */}
    //   </Routes>
    // </div>

    // <div className="App">
    //   <Routes>
    //     <Route path="/todo" element={<Todo />} />
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/register" element={<Register />} />
    //     <PrivateRoute
    //       element={
    //         <>
    //           <Route path="/home" element={<Home />} />
    //           <Route path="/results" element={<Results />} />
    //           <Route path="/upload" element={<Upload />} />
    //           <Route path="/profile" element={<Profile />} />
    //         </>
    //       }
    //     />
    //   </Routes>
    // </div>
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
