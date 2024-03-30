/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { FormEvent, useState } from "react";
import BeachScene from "./BeachScene";
import classes from "./style.module.css";
import LineChart from "./Chart";
import { arange } from "../../utils/arange";
const BeachNourishmentPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const formHandle = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const { wave_height, wave_period, D, rho, dfifthy } = e.target;
    const values = {
      wave_height: wave_height.value,
      wave_period: wave_period.value,
      D: D.value,
      rho: rho.value,
      dfifthy: dfifthy.value,
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
  };

  return (
    <>
      <div style={{ padding: "20px", boxShadow: "0 0 4px 1px #dddddd" }}>
        CESOFT | <span style={{ fontWeight: "bold" }}>Beach Nourishment </span>
      </div>
      <div className={classes.layout}>
        <div className={classes.layout_left}>
          <form onSubmit={formHandle} className={classes.inputs}>
            <span>Wave Properties</span>
            <input name="wave_height" placeholder="Add wave height" />
            <input name="wave_period" placeholder="Add wave Period" />
            <span>Soil Properties</span>
            <input name="D" placeholder="Add  D" />
            <input name="dfifthy" placeholder="Add  dfifthy" />
            <input name="rho" placeholder="Add rho" />
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
                <div>Closure Depth X : {Number(data["x"]).toFixed(2)} m</div>
                <div>A : {Number(data["A"]).toFixed(2)} </div>
              </div>
              <div className={classes.chart}>
                {
                  <LineChart
                    data={arange(data["x"]).map((m) => [
                      m,
                      -1 * data["A"] * Math.pow(m, 2 / 3),
                    ])}
                  />
                }
              </div>
            </>
          )}
        </div>
        <div className={classes.layout_right}>
          {loading && <>Loading</>}
          {!loading && !data && <div>No Preview</div>}
          {data && (
            <BeachScene
              A={data["A"]}
              x={data["x"]}
              y={-1 * data["closure_depth"]}
              matris={data["matris"]}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default BeachNourishmentPage;
