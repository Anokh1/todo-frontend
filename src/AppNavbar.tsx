import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { ClearToken } from "utilities/Function/clearToken.function";

const AppNavbar: React.FC = () => {
  const navigate = useNavigate();

  // Menu items with routing
  const menuItems = [
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => navigate("/"),
    },
    {
      label: "To-Do",
      icon: "pi pi-list",
      command: () => navigate("/todo"),
    },
    {
      label: "Admin",
      icon: "pi pi-cog",
      command: () => navigate("/admin"),
    },
    {
      label: "NAS",
      icon: "pi pi-server",
      command: () => navigate("/nas"),
    },
    {
      label: "Network",
      icon: "pi pi-sitemap",
      command: () => navigate("/network"),
    },
    {
      label: "Scan",
      icon: "pi pi-id-card",
      command: () => navigate("/scan"),
    },
  ];

  const start = (
    <div className="flex align-items-center">
      <img src="logo.png" alt="Logo" height="40" className="mr-2" />
      <span className="font-bold text-lg">MyApp</span>
    </div>
  );

  const end = (
    <div className="flex align-items-center">
      <InputText
        placeholder="Search"
        className="mr-2"
        style={{ width: "200px" }}
      />
      <Button icon="pi pi-search" className="mr-2" />
      <Button
        label="Login"
        icon="pi pi-sign-in"
        className="p-button-outlined"
        onClick={() => {
          ClearToken();
          navigate("/login");
        }}
      />
    </div>
  );

  return (
    <Menubar
      model={menuItems}
      //    start={start}
      end={end}
    />
  );
};

export default AppNavbar;
