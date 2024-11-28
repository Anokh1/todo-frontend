import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "./assets/images/todo-logo.png";
import AppMenu from "AppMenu";

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
        <button className="logo p-link" onClick={() => navigate("/")}>
          <img src={logo} alt="logo" />
        </button>

        <p
          className="ml-3 p-link"
          style={{ fontSize: "1.6em" }}
          onClick={() => navigate("/")}
        >
          Todo
        </p>
      </div>

      <AppMenu
        model={props.items}
        menuMode={props.menuMode}
        colorScheme={props.colorScheme}
        menuActive={props.menuActive}
        activeInlineProfile={props.activeInlineProfile}
        onSidebarMouseOver={props.onSidebarMouseOver}
        onSidebarMouseLeave={props.onSidebarMouseLeave}
        toggleMenu={props.onToggleMenu}
        onChangeActiveInlineMenu={props.onChangeActiveInlineMenu}
        onMenuClick={props.onMenuClick}
        onRootMenuItemClick={props.onRootMenuItemClick}
        onMenuItemClick={props.onMenuItemClick}
      />
    </div>
  );
};

export default AppTopBar;
