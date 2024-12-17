import React, { useRef, useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { Chart } from "chart.js";
import { Button } from "primereact/button";
import { SpinWheelProps } from "utilities/Interface/ScanInterface";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const SpinWheel: React.FC<SpinWheelProps> = ({ prizeList }) => {
  const prizeName = prizeList.map((prize) => {
    return prize.Item;
  });
  const chartRef = useRef<Chart<"doughnut"> | null>(null);
  const [prizes, setPrizes] = useState(prizeName); // State for updated prize list
  const [spinning, setSpinning] = useState(false);
  const [prizeWon, setPrizeWon] = useState<string | null>(null);
  const [prizeMessage, setPrizeMessage] = useState<string | null>(null);
  const [drawsLeft, setDrawsLeft] = useState(0);

  // Prepare chart data
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

  // Custom plugin to display the prize name in the center
  const centerTextPlugin = {
    id: "centerText",
    beforeDraw: (chart: Chart) => {
      if (chart && chart.ctx) {
        const ctx = chart.ctx;
        const width = chart.width;
        const height = chart.height;
        const text = prizeWon || "Spin Me!";
        ctx.save();
        ctx.font = "bold 16px Arial";
        ctx.fillStyle = "#333";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, width / 2, height / 2);
        ctx.restore();
      }
    },
  };

  const spinWheel = () => {
    if (chartRef.current) {
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
        setPrizeWon(prize);

        setPrizeMessage(`You won: ${prize}`);

        // Update prize list to remove the won prize
        // setPrizes(prizes.filter((_, index) => index !== selectedIndex));
        setSpinning(false);

        setTimeout(() => setPrizeMessage(null), 2000);
      }, 1000);
    }
  };

  // Control and Enter to spin the wheel
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

  return (
    <div className="grid align-items-start">
      {/* Doughnut Chart and Button Container */}
      <div className="col-12 md:col-6 flex flex-column align-items-center">
        <Doughnut
          ref={chartRef}
          data={chartData}
          options={{
            plugins: {
              legend: {
                display: false, // Hide the legend
              },
            },
          }}
        />
        <Button
          label={spinning ? "Spinning..." : "Spin Wheel"}
          onClick={spinWheel}
          disabled={spinning || drawsLeft <= 0}
          className="mt-4"
        />
      </div>

      {/* Right Component - DataTable Container */}
      <div className="col-12 md:col-5">
        <div className="card">
          <h3 className="text-center mb-3">Draws Left: {drawsLeft}</h3>
          <DataTable
            value={prizeList}
            paginator
            rows={10}
            selectionMode="single"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} names"
            emptyMessage="No record found."
            scrollable
            className="p-datatable-striped"
          >
            <Column field="Item" header="Prize Name" />
            <Column field="Quantity" header="Quantity" />
          </DataTable>
        </div>
      </div>

      {/* Prize Message */}
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
