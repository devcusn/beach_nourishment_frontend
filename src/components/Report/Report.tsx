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
import BeachScene from "../../container/beach-nourishment/BeachScene";
import ReportSinglePage from "./ReportSinglePage";
import Weather from "../../container/beach-nourishment/components/Weather/Weather";

const ReportComponent: React.FunctionComponent<ReportProps> = ({
  toggleReport,
}) => {
  const { name, project, projectLocation, shoreLength } = useProjectStore();
  const data = project;
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className={classes.report_container} onClick={toggleReport}>
      <div
        ref={ref}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "850px",
          width: "100%",
        }}
      >
        <ReportSinglePage>
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
              at {projectLocation[0]}, {projectLocation[1]}. The total length of
              this beach is {shoreLength.toFixed(2)} meters, the beach length is
              90 meters. The project cost is also 12342.123 dollars.
            </div>
          </ReportSection>
          <ReportSection title={"Location"}>
            <div>
              <Map height={"250px"} />
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
        </ReportSinglePage>
        <ReportSinglePage>
          <Weather />
        </ReportSinglePage>
        <ReportSinglePage>
          <ReportSection title={"Cross section A - A "}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                height: "275px",
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
          <ReportSection title={"Cross section B - B "}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                height: "275px",
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
          <ReportSection title={"Cross section C - C "}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                height: "275px",
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
        </ReportSinglePage>
        <ReportSinglePage>
          <ReportSection title={"3D Project Design"}>
            <div style={{ height: "300px" }}>
              {data && (
                <BeachScene
                  A={data["A"]}
                  x={data["closure_depth_x"]}
                  z={data["total_length"]}
                  y={-1 * data["closure_depth"]}
                  matris={data["matris"]}
                  beach_length={data["beach_length"]}
                  coast_length={data["total_length"]}
                  revetment={data["revetment_position"]}
                />
              )}
            </div>
          </ReportSection>
          <ReportSection title={"Project Cost"}>
            <div style={{}}>
              <div>Tatal Project Cost = 500 * 1 = 500 USD</div>
            </div>
          </ReportSection>
        </ReportSinglePage>
      </div>
    </div>
  );
};
export default ReportComponent;
