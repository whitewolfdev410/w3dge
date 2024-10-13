import React, { useState, useEffect } from "react";

interface IPropsCounterAnimationWithInput {
  style: string;
  step: any;
  countSteps?: number;
  duration?: number;
  tagText?: string;
  onValueChange: (value: number) => void; // Callback function for value change
}

const CounterAnimationWithInput: React.FC<IPropsCounterAnimationWithInput> = ({
  style,
  step,
  countSteps = 10,
  duration = 5000,
  onValueChange,
}) => {
  const [num, setNum] = useState<number>(0); // Start at 0

  useEffect(() => {
    const steps = step;
    const intervalTime = duration / steps;

    let currentStep = step - Math.trunc(step);
    const interval = setInterval(() => {
      setNum(currentStep);
      currentStep = currentStep + countSteps;
      if (currentStep > steps) {
        setNum(step);
        clearInterval(interval);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [step, countSteps, duration]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (newValue === "" || isNaN(Number(newValue))) {
      setNum(0);
    } else {
      setNum(parseInt(newValue));
      onValueChange(parseFloat(newValue));
    }
  };

  const handleFocus = () => {
    setNum(0);
  };

  return (
    <div>
      <input
        className={style}
        value={num}
        min={num}
        onChange={handleChange}
        onFocus={handleFocus}
      />
    </div>
  );
};

export default CounterAnimationWithInput;
