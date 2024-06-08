import Step from "./Step";
import { StepperProps } from "./types";
import classes from "./style.module.css";
import { useEffect, useState } from "react";
const Stepper: React.FunctionComponent<StepperProps> = ({
  steps,
  onChange,
  onLastStep,
}) => {
  const [selectedStep, setSelectedStep] = useState(1);

  useEffect(() => {
    onChange(selectedStep);
  }, [selectedStep, onChange]);

  return (
    <div className={classes.stepper_container}>
      <button
        onClick={() => setSelectedStep((prev) => prev - 1)}
        className={classes.stepper_btn}
      >
        back
      </button>
      <div className={classes.stepper_steps}>
        {steps.map((step, index) => (
          <Step
            isSelected={step.id === selectedStep}
            label={step.label}
            id={step.id}
            isEnd={steps.length === index + 1}
          />
        ))}
      </div>
      <button
        onClick={() => {
          if (selectedStep === steps.length) {
            onLastStep();
          }
          setSelectedStep((prev) => prev + 1);
        }}
        className={classes.stepper_btn}
      >
        Next
      </button>
    </div>
  );
};
export default Stepper;
