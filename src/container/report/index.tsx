import { useRef } from "react";
import ReportComponent from "../../components/Report2/Report";
import classes from "./style.module.css";

const ReportPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const downloadnPDFHandler = () => {
    ref.current?.style.setProperty("display", "none");
    print();
  };
  return (
    <div className={classes.pdf_container}>
      <div ref={ref} className={classes.header_pdf}>
        <div className={classes.pdf_title}>PDF REPORT</div>
        <button className={classes.header_button} onClick={downloadnPDFHandler}>
          Download PDF
        </button>
      </div>
      <ReportComponent toggleReport={() => {}} />
    </div>
  );
};
export default ReportPage;