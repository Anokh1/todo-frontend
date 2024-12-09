// import logo from "./assets/images/data-server.png";
import logo from "../favicon.png";


const AppFooter = (props: any) => {
  return (
    <div className="layout-footer p-fluid flex flex-column md:flex-row align-items-center justify-content-between px-4 py-3">
      {" "}
      {/* Added padding */}
      <div className="flex align-items-center mb-2 md:mb-0">
        <img
          id="footer-logo"
          src={logo}
          alt="gt-hub-layout"
          className="mr-2"
          style={{ width: "33px", height: "auto" }} // Adjust size as needed
        />
        <span className="copyright">Take Out Dinner Options</span>
      </div>
      <div className="flex flex-column md:flex-row align-items-center">
        <span className="copyright mb-2 md:mb-0">
          &#169; Sometime - {new Date().getFullYear()}
        </span>
        <span className="copyright ml-0 md:ml-2">
          Version -{import.meta.env.VITE_APP_VERSION_INFO} | Developed today
        </span>
      </div>
    </div>
  );
};

export default AppFooter;
