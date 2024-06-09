import classes from "./style.module.css";
import { ReportSinglePageProps } from "./types";

const ReportSinglePage: React.FunctionComponent<ReportSinglePageProps> = ({
  children,
}) => {
  return <div className={classes.report}>{children}</div>;
};
export default ReportSinglePage;
