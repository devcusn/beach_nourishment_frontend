import classes from "./style.module.css";
import { ReportProps } from "./types";

const Report: React.FunctionComponent<ReportProps> = ({ toggleReport }) => {
  return (
    <div className={classes.report_container} onClick={toggleReport}>
      <div onClick={(e) => e.stopPropagation()} className={classes.report}>
        hello
      </div>
    </div>
  );
};
export default Report;
