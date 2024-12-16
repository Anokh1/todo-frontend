import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React from "react";
import { EmployeeInputProps } from "utilities/Interface/ScanInterface";

const EmployeeInput: React.FC<EmployeeInputProps> = ({
  title,
  description,
}) => {
  return (
    <div className="col-12 md:col-6">
      <div className="p-3">
        <h2 className="text-center">{title}</h2>
        <p>{description}</p>
      </div>

      <div className="grid">
        <div className="col-12 md:col-6">
          <InputText
            id="accessCard"
            placeholder="Enter Access Card"
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>
        <div className="col-12 md:col-6">
          <InputText
            id="employeeId"
            placeholder="Enter Employee ID"
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>
        <div className="col-12">
          <Button label="Submit" style={{ width: "100%" }} />
        </div>
      </div>
    </div>
  );
};

export default EmployeeInput;
