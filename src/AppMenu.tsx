import React, { forwardRef, useCallback, useState } from "react";
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
        if (ink) {
          removeClass(ink, "p-ink-active");
        }
      }
    }

    props.onMenuItemClick({
      originalEvent: event,
      item: item,
    });
  };

  const onKeyDown = (event: any, item: any, index: any) => {
    if (event.key === "Enter") {
      onMenuItemClick(event, item, index);
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

  const removeClass = (element: any, className: string) => {
    if (element.classList) element.classList.remove(className);
    else
      element.className = element.className.replace(
        new RegExp(
          "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
          "gi"
        ),
        " "
      );
  };

  const onMenuItemMouseEnter = (index: any) => {
    if (props.root && props.menuActive && isHorizontalOrSlim() && !isMobile()) {
      setActiveIndex(index);
    }
  };

  const isMobile = () => {
    return window.innerWidth <= 991;
  };

  const isStatic = () => {
    return props.menuMode === "static";
  };

  const isHorizontalOrSlim = useCallback(() => {
    return props.menuMode === "horizontal" || props.menuMode === "slim";
  }, [props.menuMode]);

  const visible = (item: any) => {
    return typeof item.visible === "function"
      ? item.visible()
      : item.visible !== false;
  };

  // const getLink = (item: any, index: any) => {
  //   const menuItemIconClassName = classNames("layout-menuitem-icon", item.icon); 
  //   const content = (
  //     <>
  //     </>
  //   )
  // }


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
