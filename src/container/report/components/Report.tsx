import { useRef } from "react";
import LineChart from "../../beach-nourishment/Chart";
import useProjectStore from "../../../store/projectStore";
import { arange } from "../../../utils/arange";
import classes from "./style.module.css";
import { ReportProps } from "./types";
import Map from "../../../components/Map/Map";
import KaTeX from "../../../components/Katex";
import "katex/dist/katex.min.css";
import BeachScene from "../../beach-nourishment/BeachScene";
import ReportSinglePage from "./ReportSinglePage";
import Weather from "../../beach-nourishment/components/Weather/Weather";
import ReportSection from "./Section";
import EstimatedCost from "./Part/EstimetedCost";
import GraphIMG from "../../../assets/graph.jpeg";
const ReportComponent: React.FunctionComponent<ReportProps> = () => {
  const { name, project, projectLocation, shoreLength, beachLength } =
    useProjectStore();
  const data = project;
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className={classes.report_container}>
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
              {` it is a beach nourishment project that will be realized in Giresun
              at ${projectLocation[0]}, ${
                projectLocation[1]
              }. The total length of
              this beach is ${shoreLength.toFixed(
                2
              )} meters, the beach length is
              ${beachLength.toFixed(2)} meters. The project cost is also
              12342.123 dollars.`}
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
                height: "400px",
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
          <ReportSection title={"Chart "}>
            <img src={GraphIMG} width="100%" />
            <table className={classes.table}>
              <thead>
                <tr>
                  <th></th>
                  <th>C1(m2)</th>
                  <th>C2(m2)</th>
                  <th>C3(m2)</th>
                  <th>C4(m2)</th>
                  <th>Total area without sill (m2)</th>
                  <th>Total area with sill (m2)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>A-A</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                  <td>10</td>
                </tr>
              </tbody>
            </table>
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
            <EstimatedCost />
          </ReportSection>
        </ReportSinglePage>
      </div>
    </div>
  );
};
export default ReportComponent;
