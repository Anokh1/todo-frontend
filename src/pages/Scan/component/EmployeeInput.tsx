import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import ScanService from "services/scan.service";
import {
  showError,
  showSuccess,
  showWarning,
} from "utilities/Function/toast.function";
import { EmployeeInputProps } from "utilities/Interface/ScanInterface";

const EmployeeInput: React.FC<EmployeeInputProps> = ({
  title,
  description,
  type,
  // nameList,
  dataList,
  onFetchDataList,
  employeeInfo,
  activeTab,
}) => {
  const [accessCard, setAccessCard] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  // const [activeTab, setActiveTab] = useState(0);
  const [drawsLeft, setDrawsLeft] = useState(0);
  const [employeeData, setEmployeeData] = useState(null);

  const toastRef = useRef<Toast>(null);

  const scanService = new ScanService();

  useEffect(() => {
    if (employeeInfo && employeeData) {
      employeeInfo(employeeData);
    }
  }, [employeeData, employeeInfo]);

  const getColumnToUpdate = () => {
    switch (activeTab) {
      case 1:
        return "Check In";
      case 2:
        return "Collection Door Gift";
      case 3:
        return "Spin & Win";
      case 4:
        return "Tab 1";
      case 5:
        return "Tab 2";
      case 6:
        return "Tab 3";
      case 7:
        return "Tab 4";
      case 8:
        return "Tab 5";
      default:
        return "";
    }
  };

  const getDrawsLeft = async (matchingRow: any, numberOfDraw: number) => {
    setDrawsLeft(numberOfDraw);
    setEmployeeData(matchingRow);
  };

  const handleSubmit = async () => {
    const trimAccessCard = accessCard.replace(/^0+/, "");
    const trimEmployeeId = employeeId.trim();

    if (!trimAccessCard && !trimEmployeeId) {
      showWarning(toastRef, "No required details provided");
      return;
    }

    const findEmployee = dataList.find(
      (row) =>
        (trimEmployeeId && String(row["ID"]) === trimEmployeeId) ||
        (trimAccessCard && String(row["Access Card"]) === trimAccessCard)
    );
    if (!findEmployee) {
      showWarning(toastRef, "Employee not found");
      return;
    }

    try {
      if (type === "submit") {
        const columnToUpdate = getColumnToUpdate();
        const res = await scanService.addToNameList(
          trimAccessCard ? "scan" : "employeeId",
          trimAccessCard || trimEmployeeId,
          columnToUpdate
        );

        if (res.status) {
          showSuccess(toastRef, res.message);

          if (activeTab === 3) {
            await getDrawsLeft(findEmployee, findEmployee["Lucky Draw Entry"]);
          }
        } else {
          showError(toastRef, res.message);
        }

        setAccessCard("");
        setEmployeeId("");
        await onFetchDataList();
      } else if (type === "attendance") {
        const res = await scanService.addAttendance(
          trimAccessCard ? "scan" : "employeeId",
          trimAccessCard || trimEmployeeId,
          "Clock In"
        );
        if (res.status) {
          showSuccess(toastRef, res.message);
        } else {
          showError(toastRef, res.message);
        }

        setAccessCard("");
        setEmployeeId("");
        await onFetchDataList();
      }
    } catch (error) {
      showError(toastRef, "Submit failed");
    }
  };

  return (
    <div className="col-12 md:col-12">
      <Toast ref={toastRef} />

      <div className="p-3">
        <h2 className="text-center">{title}</h2>
        <p>{description}</p>
      </div>

      <div className="grid">
        <div className="col-12 md:col-6">
          <InputText
            id="accessCard"
            value={accessCard}
            onChange={(e) => setAccessCard(e.target.value)}
            placeholder="Enter Access Card"
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>
        <div className="col-12 md:col-6">
          <InputText
            id="employeeId"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            placeholder="Enter Employee ID"
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>
        <div className="col-12">
          <Button
            label="Submit"
            onClick={handleSubmit}
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeInput;
