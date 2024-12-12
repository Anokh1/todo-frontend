import logo from "assets/images/todo-logo.png";

export const AuthenticationBackground = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: `url(${logo})`,
        backgroundRepeat: "repeat",
        backgroundSize: "33px 33px", // Adjust size of the repeated image
        zIndex: -1, // Ensure it stays behind other content
      }}
    ></div>
  );
};
