/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { FormEvent, useState } from "react";
import BeachScene from "./BeachScene";
import classes from "./style.module.css";
import LineChart from "./Chart";
import { arange } from "../../utils/arange";
import Report from "../../components/Report/Report";
import useProjectStore from "../../store/projectStore";
import LoaderNoPreview from "../../components/LoaderNoPreview";

const BeachNourishmentPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toggleReport, setToggleReport] = useState(false);
  const setProject = useProjectStore((state) => state.setProject);
  const formHandle = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const {
      wave_height,
      wave_period,
      D,
      rho,
      dfifthy,
      totalLength,
      lengthOfBeach,
      revetment,
    } = e.target;
    const values = {
      wave_height: wave_height.value,
      wave_period: wave_period.value,
      D: D.value,
      rho: rho.value,
      dfifthy: dfifthy.value,
      total_length: totalLength.value,
      length_of_beach: lengthOfBeach.value,
      revetment: revetment.value,
    };
    const res = await fetch("http://127.0.0.1:5000/api/closure_depth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await res.json();

    setLoading(false);
    setData(data.data);
    setProject(data.data);
  };
  console.log(data);
  return (
    <>
      <div style={{ padding: "20px", boxShadow: "0 0 4px 1px #dddddd" }}>
        CESOFT | <span style={{ fontWeight: "bold" }}>Beach Nourishment </span>
      </div>
      <div className={classes.layout}>
        <div className={classes.layout_left}>
          <form onSubmit={formHandle} className={classes.inputs}>
            <span className={classes.big_label}>Coast</span>
            <div>
              <span className={classes.label}>Total Lenght(m)</span>
              <input
                defaultValue={3}
                name="totalLength"
                placeholder="Total Length(m)"
              />
            </div>
            <div>
              <span className={classes.label}>Length of the beach(m)</span>
              <input
                defaultValue={3}
                name="lengthOfBeach"
                placeholder="length of beach(m)"
              />
            </div>
            <div>
              <span className={classes.label}>Erosion %</span>
              <input defaultValue={60} name="erosion" placeholder="Erozion" />
            </div>
            <div>
              <span className={classes.label}>Revetment Depth(m)</span>
              <input
                defaultValue={3}
                name="revetment"
                placeholder="revetment depth(m)"
              />
            </div>
            <span className={classes.big_label}>Wave Properties</span>
            <div>
              <span className={classes.label}>Wave Height(m):</span>
              <input
                defaultValue={2.5}
                name="wave_height"
                placeholder="Add wave height(m)"
              />
            </div>

            <div>
              <span className={classes.label}>Wave Period:</span>
              <input
                defaultValue={8}
                name="wave_period"
                placeholder="Add wave Period"
              />
            </div>

            <span className={classes.big_label}>Soil Properties</span>
            <div>
              <span className={classes.label}>D:</span>
              <input defaultValue={1} name="D" placeholder="Add  D" />
            </div>
            <div>
              <span className={classes.label}>D50:</span>
              <input
                defaultValue={1}
                name="dfifthy"
                placeholder="Add  dfifthy"
              />
            </div>
            <div>
              <span className={classes.label}>RHO:</span>
              <input defaultValue={1} name="rho" placeholder="Add rho" />
            </div>
            <div className={classes.actions}>
              <button className={classes.btn} type="submit">
                Calculate Closure Depth
              </button>
            </div>
          </form>
          {data && (
            <>
              <div className={classes.reports}>
                <div>
                  Closure Depth: {Number(data["closure_depth"]).toFixed(2)} m
                </div>
                <div>
                  Closure Depth X : {Number(data["closure_depth_x"]).toFixed(2)}{" "}
                  m
                </div>
                <div>A : {Number(data["A"]).toFixed(2)} </div>
                <div>Volume : {Number(data["volume"]).toFixed(2)} m^3 </div>
                <button onClick={() => setToggleReport(true)}>
                  Open Report
                </button>
              </div>
              <div className={classes.chart}>
                {
                  <LineChart
                    data={arange(data["closure_depth_x"]).map((m) => [
                      m,
                      -1 * data["A"] * Math.pow(m, 2 / 3),
                    ])}
                    beach_length={data["beach_length"]}
                  />
                }
              </div>
            </>
          )}
        </div>
        <div className={classes.layout_right}>
          {!data && (
            <LoaderNoPreview
              isLoading={loading}
              noPreview={!loading && !data}
            />
          )}

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
      </div>
      {toggleReport && (
        <Report toggleReport={() => setToggleReport(!toggleReport)} />
      )}
    </>
  );
};

export default BeachNourishmentPage;
