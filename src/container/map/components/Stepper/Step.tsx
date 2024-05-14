import classes from "./style.module.css";
import { StepProps } from "./types";

const Step: React.FunctionComponent<StepProps> = ({
  label,
  id,
  isEnd,
  isSelected,
}) => {
  return (
    <>
      <div className={classes.step}>
        <span className={isSelected ? classes.selected_id : classes.id}>
          {id}
        </span>
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
