import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Map from "../../components/Map/Map";
import Stepper from "./components/Stepper/Stepper";
import useProjectStore from "../../store/projectStore";
import { getWeather } from "../../services/endpoints";
import Weather from "../beach-nourishment/components/Weather/Weather";
import { polylineDistance } from "../../utils/haversineDistance";

const MapContainer = () => {
  const {
    projectLocation,
    weatherLocation,
    setWeather,
    shoreCoordinates,
    beachLength,
  } = useProjectStore();
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
              { label: "Determine the coast shore", id: 3 },
              { label: "Determine the beach length", id: 4 },
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
              <div>
                Total Length:{polylineDistance(shoreCoordinates).toFixed(2)} m
              </div>
            </div>
          )}
          {selectedStep === 4 && (
            <div>
              <h4>Beach Data</h4>
              <div>Total Length:{(beachLength || 0).toFixed(2)} m</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default MapContainer;
