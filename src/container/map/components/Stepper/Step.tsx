import classes from "./style.module.css";
import { StepProps } from "./types";

const Step: React.FunctionComponent<StepProps> = ({ label, id, isEnd }) => {
  return (
    <>
      <div className={classes.step}>
        <span className={classes.id}>{id}</span>
        {label}
      </div>
      {!isEnd && (
        <div
          style={{ borderBottom: "2px solid #cccccc", width: "100px" }}
        ></div>
      )}
    </>
  );
};
export default Step;
