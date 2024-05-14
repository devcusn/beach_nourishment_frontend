import Map from "../../components/Map/Map";
import Stepper from "./components/Stepper/Stepper";

const MapContainer = () => {
  return (
    <div>
      <div>
        <Stepper
          steps={[
            { label: "Select Weather", id: 1 },
            { label: "Select Coord", id: 2 },
            { label: "Determine the beach shore", id: 3 },
          ]}
          onClick={() => {}}
        />
      </div>

      <Map height={"100vh"} />
    </div>
  );
};
export default MapContainer;
