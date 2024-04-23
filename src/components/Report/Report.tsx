import { useRef } from "react";
import LineChart from "../../container/beach-nourishment/Chart";
import useProjectStore from "../../store/projectStore";
import { arange } from "../../utils/arange";
import ReportSection from "./Section";
import classes from "./style.module.css";
import { ReportProps } from "./types";

const Report: React.FunctionComponent<ReportProps> = ({ toggleReport }) => {
  const { name, project } = useProjectStore();
  const ref = useRef<HTMLDivElement>(null);
  const downloadPDF = () => {
    window.print();
  };

  return (
    <div className={classes.report_container} onClick={toggleReport}>
      <button onClick={downloadPDF}>download</button>
      <div
        ref={ref}
        onClick={(e) => e.stopPropagation()}
        className={classes.report}
      >
        <h2 className={classes.project_name}>{name}</h2>
        <ReportSection title="Project Datas">
          <div>
            <span>Closure Depth x(m):</span>
            <span>{project.closure_depth_x.toFixed(2)}</span>
          </div>
          <div>
            <span>A:</span>
            <span>{project.A}</span>
          </div>
          <div>
            <span>Beach Length(m):</span>
            <span>{project.beach_length}</span>
          </div>
          <div>
            <span>A:</span>
            <span>{project.A}</span>
          </div>
          <div>
            <span>A:</span>
            <span>{project.A}</span>
          </div>
          <div>
            <span>A:</span>
            <span>{project.A}</span>
          </div>
        </ReportSection>
        <ReportSection title={"Chart"}>
          <div
            style={{
              width: "800px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <LineChart
              data={arange(project["closure_depth_x"]).map((m) => [
                m,
                -1 * project["A"] * Math.pow(m, 2 / 3),
              ])}
              beach_length={project["beach_length"]}
            />
          </div>
        </ReportSection>
      </div>
    </div>
  );
};
export default Report;
