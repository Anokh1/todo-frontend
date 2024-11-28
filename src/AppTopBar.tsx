import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "./assets/images/todo-logo.png";

const AppTopBar = (props: any) => {
  //   const { username, role } = useContext(UserContext);
  const location = useLocation();
  const currentLocation = location.pathname.split("/")[1];
  const navigate = useNavigate();

  const topBarButtonStyle = (path_name: string) => ({
    width: "100%",
    backgroundColor: currentLocation === path_name ? "#fff" : "transparent",
    color: currentLocation === path_name ? "white" : "#000",
    padding_left: "10px",
  });

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="layout-topbar">
      <div className="layout-topbar-left">
        <button
          className="topbar-menu-button p-link"
          onClick={props.onMenuButtonClick}
        >
          <i className="pi pi-bars"></i>
        </button>
        <img
          src={logo}
          onAuxClick={handleLogoClick}
          alt="Todo Logo"
          style={{ height: "50px", cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default AppTopBar;
