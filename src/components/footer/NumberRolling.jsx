import React, { useState, useEffect } from "react";

const NumberRolling = ({ targetNumber, duration }) => {
  const [displayNumber, setDisplayNumber] = useState(0);
  const [isPopped, setIsPopped] = useState(false);

  useEffect(() => {
    let start = 0;
    const end = targetNumber;
    const steps = Math.min(duration / 40, 100); // Ensure a reasonable number of steps
    const increment = end / steps;

    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayNumber(end);
        clearInterval(interval);
        setIsPopped(true); // Trigger pop animation
        setTimeout(() => setIsPopped(false), 300); // Reset pop state after animation
      } else {
        setDisplayNumber(Math.floor(start));
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [targetNumber, duration]);

  return (
    <div className="flex flex-col items-center">
      <div className="overflow-hidden h-[150px] px-[25px] flex items-center">
        <div className={`transition ${isPopped ? "pop-animation" : ""}`}>
          {displayNumber}+
        </div>
      </div>
    </div>
  );
};

export default NumberRolling;
