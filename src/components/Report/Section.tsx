import classes from "./style.module.css";
import { ReportSectionProps } from "./types";

const ReportSection: React.FunctionComponent<ReportSectionProps> = ({
  title,
  children,
}) => {
  return (
    <>
      <div className={classes.report_section__title}>{title}</div>
      <div className={classes.report_section__content}>{children}</div>
    </>
  );
};

export default ReportSection;
