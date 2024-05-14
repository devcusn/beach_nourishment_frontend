import { useState } from "react";
import Map from "../../components/Map/Map";
import Stepper from "./components/Stepper/Stepper";
import { useNavigate } from "react-router-dom";

const MapContainer = () => {
  const [selectedStep, setSelectedStep] = useState(0);
  const navigate = useNavigate();
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
      <Map height={"100vh"} feature={selectedStep} />
    </div>
  );
};
export default MapContainer;
