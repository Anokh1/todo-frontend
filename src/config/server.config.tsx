interface configProps {
  hostname: string;
  frontend_port: number;
  backend_port: number;
}
console.log("REACT ENV", import.meta.env.VITE_APP_ENV);

const devConfig: configProps = {
  hostname: "http://localhost",
  frontend_port: 3222,
  backend_port: 3002,
};

let config: configProps;
let loginConfig: configProps;

config = devConfig;

export { config as default, loginConfig };
