import { Chart } from "chart.js";
import "chart.js/auto";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useRef, useState } from "react";

const EmployeeInput: React.FC = () => {
  const chartRef = useRef<Chart<"doughnut"> | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [prizeWon, setPrizeWon] = useState<string | null>(null);
  const [prizeMessage, setPrizeMessage] = useState<string | null>(null);

  return (
    <div className="col-12 md:col-6">
      <div className="p-3">
        <h2 className="text-center">Welcome to Spin N Win!</h2>
        <p>
          Spin the wheel and stand a chance to win exciting prizes like a Car,
          Vacation, Gift Cards, and more! Click the button or use{" "}
          <kbd>Ctrl</kbd> + <kbd>Enter</kbd> to spin.
        </p>
      </div>

      {/* Inputs and Submit Button */}
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
          <Button
            label="Submit"
            style={{ width: "100%" }}
            disabled={spinning}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeInput;
