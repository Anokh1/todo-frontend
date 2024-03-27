import React from "react";
import { Link } from "react-router-dom";

const ButtonLink: React.FC<{ to: string; children: string }> = ({
  to,
  children,
}) => {
  return (
    <Link to={to} className="button-link">
      {children}
    </Link>
  );
};

export default ButtonLink;
