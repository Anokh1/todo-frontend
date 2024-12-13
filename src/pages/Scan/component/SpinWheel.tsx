import React, { useRef, useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { Chart } from "chart.js";
import { Button } from "primereact/button";

interface SpinWheelProps {
  initialPrizes: string[];
}

const SpinWheel: React.FC<SpinWheelProps> = ({ initialPrizes }) => {
  const chartRef = useRef<Chart<"doughnut"> | null>(null);
  const [prizes, setPrizes] = useState(initialPrizes); // State for updated prize list
  const [spinning, setSpinning] = useState(false);
  const [prizeWon, setPrizeWon] = useState<string | null>(null);
  const [prizeMessage, setPrizeMessage] = useState<string | null>(null);

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "60%",
      }}
    >
      <Doughnut
        ref={chartRef}
        data={chartData}
        options={{
          plugins: {
            legend: {
              position: "right", // Explicitly cast to accepted literal type
              align: "start", // Align legend items in a column
            },
          },
        }}
      />
      <Button
        label={spinning ? "Spinning..." : "Spin Wheel"}
        onClick={spinWheel}
        disabled={spinning}
      />
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
