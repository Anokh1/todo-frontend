import Admin from "pages/Admin";
import Todo from "pages/Todoz";
import { Route, Routes } from "react-router-dom";
import AppFooter from "AppFooter";
import AppNavbar from "AppNavbar";
import { Login } from "pages/Authentication/Login";
import Home from "pages/Home";
import NAS from "pages/NAS";
import Network from "pages/Network";
import { classNames } from "primereact/utils";
import { useState } from "react";
import { LoadingProvider } from "utilities/Context/LoadingContext";
import Scan from "pages/Scan";

const App: React.FC = () => {
  const [menuMode, setMenuMode] = useState("sidebar");
  const [staticMenuDesktopInactive, setStaticMenuDesktopInactive] =
    useState(false);
  const [staticMenuMobileActive, setStaticMenuMobileActive] = useState(false);
  const [overlayMenuActive, setOverlayMenuActive] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [sidebarStatic, setSideBarStatic] = useState(false);
  const [topBarMenuActive, setTopBarMenuActive] = useState(false);
  const [resetActiveIndex, setResetActiveIndex] = useState(false);
  const [configActive, setConfigActive] = useState(false);

  const ripple = true;

  const routes = [
    { label: "Todo", label_url: "todo" },
    { label: "NAS", label_url: "nas" },
    { label: "Admin", label_url: "admin" },
  ];

  let configClick: any;
  let menuClick: any;
  let topbarItemClick: any;

  const onDocumentClick = () => {
    if (!topbarItemClick) setTopBarMenuActive(false);
    if (!menuClick) {
      if (isHorizontal()) {
        setMenuActive(false);
        setResetActiveIndex;
      }
      if (overlayMenuActive || staticMenuMobileActive) {
        setOverlayMenuActive(false);
        setStaticMenuMobileActive(false);
      }
      hideOverlayMenu();
      unlockBodyScroll();
    }
    if (configActive && !configClick) setConfigActive(false);
    topbarItemClick = false;
    menuClick = false;
    configClick = false;
  };

  const onMenuButtonClick = (event: any) => {
    menuClick = true;

    if (isOverlay()) {
      setOverlayMenuActive((prevState) => !prevState);
    }

    if (isDesktop()) {
      setStaticMenuDesktopInactive((prevState) => !prevState);
    } else {
      setStaticMenuMobileActive((prevState) => !prevState);
    }

    event.preventDefault();
  };

  const hideOverlayMenu = () => {
    setOverlayMenuActive(false);
    setStaticMenuMobileActive(false);
  };

  const isHorizontal = () => menuMode === "horizontal";

  const isOverlay = () => {
    return menuMode === "slim";
  };

  const isDesktop = () => {
    return window.innerWidth > 991;
  };

  const unlockBodyScroll = () => {
    if (document.body.classList) {
      document.body.classList.remove("blocked-scroll");
    } else {
      document.body.className = document.body.className.replace(
        new RegExp(
          "(^|\\b)" + "blocked-scroll".split(" ").join("|") + "(\\b|$)",
          "gi"
        ),
        " "
      );
    }
  };

  const layoutClassName = classNames("layout-wrapper", {
    "layout-static": menuMode === "static",
    "layout-overlay": menuMode === "overlay",
    "layout-overlay-active": overlayMenuActive,
    "layout-slim": menuMode === "slim",
    "layout-horizontal": menuMode === "horizontal",
    "layout-active": menuActive,
    "layout-mobile-active": staticMenuMobileActive,
    "layout-sidebar": menuMode === "sidebar",
    "layout-sidebar-static": menuMode === "sidebar" && sidebarStatic,
    "layout-static-inactive":
      staticMenuDesktopInactive && menuMode === "static",
    "p-ripple-disabled": !ripple,
  });

  return (
    <div className={layoutClassName} onClick={onDocumentClick}>
      <div className="layout-main"></div>
      <div className="layout-main-content">
        <AppNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/nas" element={<NAS />} />
          <Route path="/network" element={<Network />} />
          <Route path="/login" element={<Login />} />
          <Route path="/scan" element={<Scan />} />
        </Routes>
        <AppFooter />
      </div>
    </div>
  );
};

export default App;
