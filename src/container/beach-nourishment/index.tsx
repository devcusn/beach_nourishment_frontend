/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { FormEvent, useCallback, useEffect, useState } from "react";
import BeachScene from "./BeachScene";
import classes from "./style.module.css";
import LineChart from "./Chart";
import { arange } from "../../utils/arange";
import Report from "../report/components/Report";
import useProjectStore from "../../store/projectStore";
import LoaderNoPreview from "../../components/LoaderNoPreview";
import { useNavigate } from "react-router-dom";
import { getWeather } from "../../services/endpoints";
import Weather from "./components/Weather/Weather";

const BeachNourishmentPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toggleReport, setToggleReport] = useState(false);
  const navigate = useNavigate();
  const { weatherLocation, setWeather, setProject, shoreLength, beachLength } =
    useProjectStore();
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

    const res = await fetch(`${import.meta.env.VITE_API}api/closure_depth`, {
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

  const handleGetWeatherData = useCallback(async () => {
    const res = await getWeather(weatherLocation[0], weatherLocation[1]);
    setWeather(res);
  }, [setWeather, weatherLocation]);

  useEffect(() => {
    handleGetWeatherData();
  }, [handleGetWeatherData]);

  return (
    <>
      <div style={{ padding: "20px", boxShadow: "0 0 4px 1px #dddddd" }}>
        CESOFT | <span style={{ fontWeight: "bold" }}>Beach Nourishment </span>
      </div>
      <div className={classes.layout}>
        <div className={classes.layout_left}>
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
                <div>Volume : {Number(data["volume"]).toFixed(2)} m^3 </div>
                <div>A : {Number(data["A"]).toFixed(2)} </div>
                <button
                  className="btn-general"
                  onClick={() => navigate("/report")}
                >
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
          {!data && (
            <form onSubmit={formHandle} className={classes.inputs}>
              <h2>Coast & Wave & Soil</h2>
              <hr />
              <span className={classes.big_label}>Coast</span>
              <div>
                <span className={classes.label}>Total Length(m)</span>
                <input
                  className={classes.input}
                  defaultValue={shoreLength.toFixed(0)}
                  name="totalLength"
                  placeholder="Total Length(m)"
                />
              </div>
              <div>
                <span className={classes.label}>Length of the beach(m)</span>
                <input
                  className={classes.input}
                  defaultValue={beachLength.toFixed(0)}
                  name="lengthOfBeach"
                  placeholder="length of beach(m)"
                />
              </div>
              <div>
                <span className={classes.label}>Erosion %</span>
                <input
                  className={classes.input}
                  defaultValue={60}
                  name="erosion"
                  placeholder="Erozion"
                />
              </div>
              <div>
                <span className={classes.label}>Sill Depth(m)</span>
                <input
                  className={classes.input}
                  defaultValue={2.5}
                  name="revetment"
                  placeholder="revetment depth(m)"
                />
              </div>
              <span className={classes.big_label}>Wave Properties</span>
              <div>
                <span className={classes.label}>Wave Height(m):</span>
                <input
                  className={classes.input}
                  defaultValue={4}
                  name="wave_height"
                  placeholder="Add wave height(m)"
                />
              </div>

              <div>
                <span className={classes.label}>Wave Period(s):</span>
                <input
                  className={classes.input}
                  defaultValue={8}
                  name="wave_period"
                  placeholder="Add wave Period(s)"
                />
              </div>

              <span className={classes.big_label}>Soil Properties</span>
              <div>
                <span className={classes.label}>D(mm):</span>
                <input
                  className={classes.input}
                  defaultValue={0.1}
                  name="D"
                  placeholder="Add  D(mm)"
                />
              </div>
              <div>
                <span className={classes.label}>D50(mm):</span>
                <input
                  className={classes.input}
                  defaultValue={1}
                  name="dfifthy"
                  placeholder="Add  dfifthy (mm)"
                />
              </div>
              <div>
                <span className={classes.label}>RHO (kg/m^3):</span>
                <input
                  className={classes.input}
                  defaultValue={1}
                  name="rho"
                  placeholder="Add rho ( kg/m^3)"
                />
              </div>
              <div className={classes.actions}>
                <button className={"btn-general"} type="submit">
                  Calculate Closure Depth
                </button>
              </div>
            </form>
          )}

          <Weather />
        </div>
        <div className={classes.layout_right}>
          {!data && (
            <LoaderNoPreview
              isLoading={loading}
              noPreview={!loading && !data}
            />
          )}
          <div style={{ height: "50%", width: "100%" }}>
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

          {/* <TwoDimensionCoast /> */}
        </div>
      </div>
      {toggleReport && (
        <Report toggleReport={() => setToggleReport(!toggleReport)} />
      )}
    </>
  );
};

export default BeachNourishmentPage;
