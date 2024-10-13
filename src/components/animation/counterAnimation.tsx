import React, { useState, useEffect } from "react";

interface IPropsCounterAnimation {
  style: string;
  step: any;
  countSteps?: number;
  duration?: number;
  tagText?: string;
}

function formatNumber(num: number): string {
  return num.toLocaleString("en-US");
}
const CounterAnimation: React.FC<IPropsCounterAnimation> = ({
  style,
  step,
  countSteps = 10,
  duration = 5000,
  tagText,
}) => {
  const [num, setNum] = useState<number>(0); // Start at 0

  useEffect(() => {
    // const duration = duration; // 5 seconds animation
    const steps = step; // We want to count from 0 to 100
    const intervalTime = duration / steps; // Time for each step

    let currentStep = step - Math.trunc(step);
    const interval = setInterval(() => {
      setNum(currentStep); // Update the number
      currentStep = currentStep + countSteps;
      if (currentStep > steps) {
        setNum(step);
        clearInterval(interval); // Stop when we reach 100
      }
    }, intervalTime);

    // Cleanup on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <p className={style}>
      {formatNumber(num)}
      {tagText}
    </p>
  );
};

export default CounterAnimation;
