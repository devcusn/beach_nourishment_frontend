import { useCallback, useEffect, useState } from "react";
import Map from "../../components/Map/Map";
import Stepper from "./components/Stepper/Stepper";
import { useNavigate } from "react-router-dom";
import useProjectStore from "../../store/projectStore";
import { getWeather } from "../../services/endpoints";
import Weather from "../beach-nourishment/Weather";
const MapContainer = () => {
  const { projectLocation, weatherLocation, setWeather } = useProjectStore();
  const [selectedStep, setSelectedStep] = useState(0);
  const navigate = useNavigate();

  const handleGetWeatherData = useCallback(async () => {
    const res = await getWeather(weatherLocation[0], weatherLocation[1]);
    setWeather(res);
  }, [setWeather, weatherLocation]);

  useEffect(() => {
    handleGetWeatherData();
  }, [handleGetWeatherData]);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ width: "100%" }}>
          <Stepper
            steps={[
              { label: "Select Coord", id: 1 },
              { label: "Select Weather Location", id: 2 },
              { label: "Determine the beach shore", id: 3 },
            ]}
            onChange={setSelectedStep}
            onLastStep={() => navigate("/analysis")}
          />
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <Map height={"100vh"} feature={selectedStep} />
        <div style={{ width: "400px", padding: "20px" }}>
          {selectedStep === 1 && (
            <div>
              <h4>Project Location</h4>
              <div>Latitude : {projectLocation[0]}</div>
              <div>Longitude: {projectLocation[1]}</div>
            </div>
          )}
          {selectedStep === 2 && (
            <div>
              <h4>Weather Data</h4>
              <Weather />
            </div>
          )}
          {selectedStep === 3 && (
            <div>
              <h4>Coast Data</h4>
            </div>
          )}{" "}
        </div>
      </div>
    </div>
  );
};
export default MapContainer;
