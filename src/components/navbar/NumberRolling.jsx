import { set } from "date-fns";
import React, { useState, useEffect } from "react";

const NumberRolling = ({ targetNumber, duration }) => {
  const [displayNumber, setDisplayNumber] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = targetNumber;
    const steps = Math.min(duration / 100, 1000); // Ensure a reasonable number of steps
    const increment = end / steps;

    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayNumber(end);
        clearInterval(interval);
      } else {
        setDisplayNumber(Math.floor(start));
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [targetNumber, duration]);

  return (
    <div className="flex flex-col items-center">
      <div className="overflow-hidden h-[150px] flex items-center">
        <div>{displayNumber} +</div>
      </div>
    </div>
  );
};

export default NumberRolling;
