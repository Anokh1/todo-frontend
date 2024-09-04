import "./App.css"; // Make sure this is correctly referenced

const AppInlineMenu = (props: any) => {
  return (
    <div className="app-inline-menu">
      <button>
        <img
          src={`https://api.dicebear.com/7.x/initials/svg?seed=Adrian`}
          alt="avatar"
        />
      </button>
      <span>Adrian</span>
    </div>
  );
};

export default AppInlineMenu;
