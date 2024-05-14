import Step from "./Step";
import { StepperProps } from "./types";
import classes from "./style.module.css";
const Stepper: React.FunctionComponent<StepperProps> = ({ steps, onClick }) => {
  return (
    <div className={classes.stepper_container}>
      <button onClick={onClick} className={classes.stepper_btn}>
        back
      </button>
      {steps.map((step, index) => (
        <Step
          label={step.label}
          id={step.id}
          isEnd={steps.length === index + 1}
        />
      ))}
      <button onClick={onClick} className={classes.stepper_btn}>
        Next
      </button>
    </div>
  );
};
export default Stepper;
