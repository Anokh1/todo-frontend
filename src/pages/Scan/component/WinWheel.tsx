import React, { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { Messages } from "primereact/messages";
import "./WinWheel.css";

const WinWheel = () => {
  const [spinning, setSpinning] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState("");
  const messagesRef = useRef<Messages>(null);
  const totalRotation = useRef(0); // Track cumulative rotation
  const wheelRef = useRef<HTMLDivElement>(null);

  // Dummy prize data (changeable for testing)
  //   const prizes = ["Car"]; // Adjust dynamically here for testing

  //   const prizes = [
  //     "Car",
  //     "Vacation",
  //     "Gift Card",
  //     "TV",
  //     "Headphones",
  //     "Laptop",
  //     "Smartphone",
  //     "Watch",
  //     "Bicycle",
  //     "Mystery Box",
  //   ];

  //   const prizes = ["TV", "TV", "TV", "TV", "TV"];

  const spinWheel = () => {
    if (spinning) return;

    setSpinning(true);

    const randomIndex = Math.floor(Math.random() * prizes.length);
    const segmentAngle = 360 / prizes.length;
    const targetRotation = randomIndex * segmentAngle;
    const extraSpins = 6 * 360; // Add extra spins for animation
    const finalRotation = totalRotation.current + extraSpins + targetRotation;

    // Update the total rotation
    totalRotation.current = finalRotation;

    const wheel = wheelRef.current;
    if (wheel) {
      wheel.style.transition = "transform 2s ease-out";
      wheel.style.transform = `rotate(${finalRotation}deg)`;
    }

    setTimeout(() => {
      setSpinning(false);
      setSelectedPrize(prizes[randomIndex]);

      messagesRef.current?.show({
        severity: "success",
        summary: "Congratulations!",
        detail: `You won ${prizes[randomIndex]}!`,
      });
    }, 2000); // Match the animation duration
  };

  // Handle key controls
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === "Enter") {
      spinWheel();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

    const prizes = ["Prize 1", "Prize 2", "Prize 3", "Prize 4", "Prize 5"];
//   const prizes = ["Prize 1", "Prize 2", "Prize 3"]; // Example prizes

  const handleSpinWheel = () => {
    wheelRef.current.style.transform = `rotate(${360 / prizes.length}deg)`;
  };

  const segments = prizes.map((prize, index) => ({
    angle: (360 / prizes.length) * index, // Dynamic angle based on number of prizes
    prize,
  }));

  return (
    <div className="wheel-container">
      <div ref={wheelRef} className="wheel">
        {segments.map((segment, index) => (
          <div
            key={index}
            className="wheel-segment"
            style={{
              transform: `rotate(${segment.angle}deg)`,
              background: `hsl(${segment.angle}, 70%, 80%)`,
              clipPath:
                prizes.length > 1
                  ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
                  : "circle(100%)", // Circle for single prize
            }}
          >
            <span
              className="segment-text"
              style={{
                transform: `rotate(-${segment.angle}deg)`,
              }}
            >
              {segment.prize}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  //   return (
  //     <div className="win-wheel-container">
  //       <Messages ref={messagesRef} />
  //       <div className="wheel-container">
  //         <div ref={wheelRef} className="wheel">
  //           {prizes.map((prize, index) => (
  //             <div
  //               key={index}
  //               className="wheel-segment"
  //               style={{
  //                 transform: `rotate(${(360 / prizes.length) * index}deg)`,
  //                 background: `hsl(${index * (360 / prizes.length)}, 70%, 80%)`,
  //                 clipPath:
  //                   prizes.length > 1
  //                     ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
  //                     : "circle(100%)",
  //               }}
  //             >
  //               <span
  //                 className="segment-text"
  //                 style={{
  //                   transform: `rotate(-${(360 / prizes.length) * index}deg)`,
  //                 }}
  //               >
  //                 {prize}
  //               </span>
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //       <Button
  //         label="Spin the Wheel"
  //         icon="pi pi-refresh"
  //         onClick={spinWheel}
  //         disabled={spinning}
  //         className="spin-button"
  //       />
  //     </div>
  //   );
};

export default WinWheel;
