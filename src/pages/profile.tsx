import React from "react";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Navbar from "../components/navbar";

export default function Profile() {
  return (
    <div>
      <Navbar />
      <div className="section">
        <div className="left-section"></div>
        <div className="right-section"></div>
      </div>
    </div>
  );
}
