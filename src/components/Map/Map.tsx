import "leaflet/dist/leaflet.css";
import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  Polygon,
  Polyline,
} from "react-leaflet";
import calculateArea from "../../utils/area";
import classes from "./style.module.css";

const CreatePolygon = ({ isActive }) => {
  const [polygones, setpolygonesPoints] = useState([]);
  console.log(calculateArea(polygones));
  const map = useMapEvents({
    click(e) {
      if (isActive) {
        setpolygonesPoints((prev) => [...prev, [e.latlng.lat, e.latlng.lng]]);
        map.locate();
      }
    },
  });

  return polygones === null ? null : (
    <Polygon pathOptions={{ color: "purple" }} positions={polygones} />
  );
};

const CreatePolyLine = ({ isActive }) => {
  const [polygones, setpolygonesPoints] = useState([]);
  const map = useMapEvents({
    click(e) {
      if (isActive) {
        setpolygonesPoints((prev) => [...prev, [e.latlng.lat, e.latlng.lng]]);
        map.locate();
      }
    },
  });

  return polygones === null ? null : (
    <Polyline pathOptions={{ color: "red" }} positions={polygones} />
  );
};

const Map = () => {
  const position = [40.9, 38.39];
  const [feat, setFeat] = useState("");
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div className={classes.map_actions}>
        <button
          className={classes.feat_btn}
          onClick={() => setFeat("polyline")}
        >
          Create PolyLine
        </button>
        <button
          className={classes.feat_btn}
          onClick={() => setFeat("polygone")}
        >
          Create Polygone
        </button>
        <div className={classes.menu_second}>
          <button>Next Step</button>
        </div>
      </div>
      <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <CreatePolyLine isActive={feat === "polyline"} />
        <CreatePolygon isActive={feat === "polygone"} />
      </MapContainer>
    </div>
  );
};
export default Map;
