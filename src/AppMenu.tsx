import React, { forwardRef, useState } from "react";
import "./App.css";
import AppInlineMenu from "AppInlineMenu";
import { useLocation } from "react-router-dom";

const AppSubmenu = forwardRef((props: any, ref: any) => {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState<any>(null);

  const onMenuItemClick = (event: any, item: any, index: any) => {
    if (item.disable) {
      event.preventDefault();
      return;
    }

    if (item.command) {
      item.command({ originalEvent: event, item: item });
      event.preventDefault();
    }

    if (item.items) {
      event.preventDefault();
    }

    if (props.root) {
      props.onRootMenuItemClick({
        originalEvent: event,
      });
    }

    if (item.items) {
      setActiveIndex(index === activeIndex ? null : index);
    } else {
      if (props.menuMode !== "sidebar") {
        const ink = getInk(event.currentTarget);
      }
    }
  };

  const getInk = (element: any) => {
    for (let i = 0; i < element.children.length; i++) {
      if (
        typeof element.children === "string" &&
        element.children[i].className.indexOf("p-ink") !== -1
      ) {
        return element.children[i];
      }
    }
    return null;
  };

  return <></>;
});

const AppMenu = (props: any) => {
  return (
    <div className="app-menu">
      <div>
        <img src="" alt="Menu Icon" />
        <p>TODO</p>
      </div>
      <div></div>
      <AppInlineMenu />
    </div>
  );
};

export default AppMenu;
