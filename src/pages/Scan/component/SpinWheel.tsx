import React, { useRef, useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { Chart } from "chart.js";

interface SpinWheelProps {
  initialPrizes: string[];
}

const SpinWheel: React.FC<SpinWheelProps> = ({ initialPrizes }) => {
  const chartRef = useRef<Chart<"doughnut"> | null>(null);
  const [prizes, setPrizes] = useState(initialPrizes); // State for updated prize list
  const [spinning, setSpinning] = useState(false);

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

  const spinWheel = () => {
    if (chartRef.current) {
      setSpinning(true); // Start spinning state

      // Get the current rotation angle
      const currentAngle = chartRef.current.options.rotation || 0;

      // Generate a random spin angle with a large base for multiple rotations
      const baseRotation = 5 * 360; // At least 5 full spins
      const randomRotation = Math.random() * 360; // Random final stopping position
      const newAngle = currentAngle + baseRotation + randomRotation;

      chartRef.current.options.rotation = newAngle;
      chartRef.current.options.animation = {
        animateRotate: true,
        animateScale: false,
      };
      chartRef.current.update();

      // Display the prize after spinning
      setTimeout(() => {
        const normalizedAngle = newAngle % 360; // Normalize angle to 0-360
        const segmentSize = 360 / prizes.length; // Size of each segment
        const selectedIndex = Math.floor(normalizedAngle / segmentSize);
        const prize = prizes[selectedIndex];

        document.getElementById(
          "prize-display"
        )!.innerText = `You won: ${prize}`;

        // Update prize list to remove the won prize
        // setPrizes(prizes.filter((_, index) => index !== selectedIndex));
        setSpinning(false); // End spinning state
      }, 1000); // Delay for spin completion
    }
  };

  // Handle keypress events for spinning the wheel
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
      <Doughnut ref={chartRef} data={chartData} />
      <button
        onClick={spinWheel}
        style={{
          marginTop: 20,
          padding: 10,
          backgroundColor: spinning ? "grey" : "blue",
          cursor: spinning ? "not-allowed" : "pointer",
          color: "white",
        }}
        disabled={spinning}
      >
        {spinning ? "Spinning..." : "Spin Wheel"}
      </button>
      <div
        id="prize-display"
        style={{ marginTop: 20, fontSize: "20px", color: "#333" }}
      ></div>
    </div>
  );
};

export default SpinWheel;
