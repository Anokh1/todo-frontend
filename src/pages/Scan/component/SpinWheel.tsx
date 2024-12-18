import React, { useRef, useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { Chart } from "chart.js";
import { Button } from "primereact/button";
import { SpinWheelProps } from "utilities/Interface/ScanInterface";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { showError, showSuccess } from "utilities/Function/toast.function";
import { Toast } from "primereact/toast";
import ScanService from "services/scan.service";

const SpinWheel: React.FC<SpinWheelProps> = ({
  prizeList,
  employeeInfo,
  onFetchPrize,
  onFetchName,
  onUpdateEmployeeInfo,
}) => {
  const chartRef = useRef<Chart<"doughnut"> | null>(null);
  const [prizes, setPrizes] = useState<string[]>([]);
  const [spinning, setSpinning] = useState(false);
  const [prizeMessage, setPrizeMessage] = useState<string | null>(null);
  const [drawsLeft, setDrawsLeft] = useState(0);
  const [employeeData, setEmployeeData] = useState(employeeInfo);

  const scanService = new ScanService();

  const toastRef = useRef<Toast>(null);

  const chartData = {
    labels: prizes,
    datasets: [
      {
        data: Array(prizes.length).fill(1),
        backgroundColor: prizes.map(
          (_, index) => `hsl(${(360 / prizes.length) * index}, 70%, 60%)`
        ),
      },
    ],
  };

  const handleSpinComplete = async (
    prize: string,
    employeeId: any,
    employeeName: string
  ) => {
    if (employeeId && drawsLeft > 0) {
      try {
        const prizeItem = prizeList.find((item) => item.Item === prize);
        if (!prizeItem) {
          showError(toastRef, "Prize not found");
          return;
        }
        const prizeQuantity = prizeItem.Quantity - 1;
        const prizeName = prizeItem.Item;

        const res = await scanService.addPrizeWinner(
          prizeQuantity,
          prizeName,
          employeeName
        );

        if (res.status) {
          showSuccess(toastRef, res.message);
          setDrawsLeft((prevDraws) => prevDraws - 1);

          if (drawsLeft < 1) {
            // Only update employeeInfo after the component is done rendering
            setTimeout(() => onUpdateEmployeeInfo(null), 500);
          }

          await onFetchPrize();
          const updatedPrizeNames = prizeList.map((item) => item.Item);
          setPrizes(updatedPrizeNames);
          await scanService.addEmployeePrize(prize, employeeId);
          await onFetchName();
        }
      } catch (error) {
        showError(toastRef, "Spin incomplete");
      }
    }
  };

  const spinWheel = () => {
    if (chartRef.current && drawsLeft > 0) {
      setSpinning(true);

      const currentAngle = chartRef.current.options.rotation || 0;

      const baseRotation = 5 * 360;
      const randomRotation = Math.random() * 360;
      const newAngle = currentAngle + baseRotation + randomRotation;

      chartRef.current.options.rotation = newAngle;
      chartRef.current.options.animation = {
        animateRotate: true,
        animateScale: false,
      };
      chartRef.current.update();

      setTimeout(() => {
        const normalizedAngle = newAngle % 360;
        const segmentSize = 360 / prizes.length;
        const selectedIndex = Math.floor(normalizedAngle / segmentSize);
        const prize = prizes[selectedIndex];

        setPrizeMessage(`You won: ${prize}`);
        setSpinning(false);

        handleSpinComplete(prize, employeeData.ID, employeeData.Name);

        setTimeout(() => setPrizeMessage(null), 2000);
      }, 1000);
    }
  };

  useEffect(() => {
    setEmployeeData(employeeInfo);
  }, [employeeInfo]);

  //   useEffect(() => {
  //     setDrawsLeft(employeeData?.["Lucky Draw Entry"] || 0);
  //   }, [employeeData]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "Enter") {
        spinWheel();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (prizeList.length > 0) {
      const prizeNames = prizeList.map((prize) => prize.Item);
      setPrizes(prizeNames);
    }
  }, [prizeList]);

  useEffect(() => {
    setEmployeeData(employeeInfo);
    setDrawsLeft(employeeData?.["Lucky Draw Entry"] || 0);
  }, [employeeInfo, employeeData]);

  return (
    <div className="grid align-items-start">
      <Toast ref={toastRef} />
      <div className="col-12 md:col-6 flex flex-column align-items-center">
        <Button
          label={spinning ? "Spinning..." : "Spin Wheel"}
          onClick={spinWheel}
          disabled={spinning || drawsLeft <= 0}
          className="mt-4"
        />
        <Doughnut
          ref={chartRef}
          data={chartData}
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
      <div className="col-12 md:col-5">
        <div className="card">
          {employeeData && (
            <h3 className="text-center mb-3">{employeeData.Name}</h3>
          )}
          <h3 className="text-center mb-3">Draws Left: {drawsLeft}</h3>
          <DataTable
            value={prizeList}
            paginator
            rows={10}
            selectionMode="single"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} prizes"
            emptyMessage="No record found."
            scrollable
            className="p-datatable-striped"
          >
            <Column field="Item" header="Prize Name" />
            <Column field="Quantity" header="Quantity" />
          </DataTable>
        </div>
      </div>
      {prizeMessage && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "24px",
            fontWeight: "bold",
            background: "rgba(255, 255, 255, 0.8)",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          {prizeMessage}
        </div>
      )}
    </div>
  );
};

export default SpinWheel;
