import React, { useState } from "react";
import Countdown from "react-countdown";

const calculateMidnight = () => {
  const now = new Date();
  const midnight = new Date(now);

  midnight.setHours(24, 0, 0, 0);
  return midnight;
};

const CountdownTimer = () => {
  const [targetDate, setTargetDate] = useState(calculateMidnight());

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      const newGoal = calculateMidnight();
      setTargetDate(newGoal);

      return <span>00:00:00</span>;
    } else {
      return (
        <div className="mt-5 flex justify-center">
          <span className="text-5xl">
            {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </span>
        </div>
      );
    }
  };

  return <Countdown date={targetDate} renderer={renderer} />;
};

export default CountdownTimer;
