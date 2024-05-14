import { useRef } from "react";
import LineChart from "../../container/beach-nourishment/Chart";
import useProjectStore from "../../store/projectStore";
import { arange } from "../../utils/arange";
import ReportSection from "./Section";
import classes from "./style.module.css";
import { ReportProps } from "./types";
import Map from "../Map/Map";
import KaTeX from "../Katex";
import "katex/dist/katex.min.css";
const ReportComponent: React.FunctionComponent<ReportProps> = ({
  toggleReport,
}) => {
  const { name, project } = useProjectStore();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className={classes.report_container} onClick={toggleReport}>
      <div
        ref={ref}
        onClick={(e) => e.stopPropagation()}
        className={classes.report}
      >
        <h2 className={classes.project_name}>{name}</h2>
        <hr />

        <ReportSection title={"Description"}>
          <div
            style={{
              height: "fit-content",
              justifyContent: "center",
            }}
          >
            it is a beach nourishment project that will be realized in Giresun
            at 41.21, 32.40. The total length of this beach is 270 meters, the
            beach length is 90 meters. The project cost is also 12342.123
            dollars.
          </div>
        </ReportSection>

        <ReportSection title={"Location"}>
          <div
            style={{
              height: "fit-content",
              justifyContent: "center",
            }}
          >
            <div>Total Coast Length</div>
            <div>Total Distance</div>
          </div>
        </ReportSection>
        <ReportSection title={"Formulas"}>
          <div
            style={{
              height: "200px",
              justifyContent: "center",
            }}
          >
            <KaTeX texExpression="A=\frac{24 \times D \times dfifthy}{5 \times \rho \times \left( \frac{\text{self.gravity}^{3/2}}{\text{self.k}^2} \right)^{2/3}}" />
            <KaTeX texExpression="\text{closure\ depth} = 2.28 \times h_s - 68.5 \times \frac{{h_s^2}}{{\text{gravity} \times t_m^2}}" />
            <KaTeX texExpression="h = A \times y^{\frac{2}{3}}" />
          </div>
        </ReportSection>
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
        <ReportSection title={"Location"}>
          <div style={{ height: "550px" }}>
            <Map height={"500px"} />
          </div>
        </ReportSection>
      </div>
    </div>
  );
};
export default ReportComponent;
