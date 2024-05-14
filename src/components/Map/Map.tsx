import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  // Polygon,
  Polyline,
} from "react-leaflet";
// import calculateArea from "../../utils/area";
// import classes from "./style.module.css";
// import { useNavigate } from "react-router-dom";
import { LatLngExpression, Icon } from "leaflet";
import useProjectStore from "../../store/projectStore";
import { polylineDistance } from "../../utils/haversineDistance";
import LocationIcon from "../../assets/location-sign.svg";

// const CreatePolygon = ({ isActive }) => {
//   const [polygones, setpolygonesPoints] = useState([]);
//   console.log(calculateArea(polygones));
//   const map = useMapEvents({
//     click(e) {
//       if (isActive) {
//         setpolygonesPoints((prev) => [...prev, [e.latlng.lat, e.latlng.lng]]);
//         map.locate();
//       }
//     },
//   });

//   return polygones === null ? null : (
//     <Polygon pathOptions={{ color: "purple" }} positions={polygones} />
//   );
// };

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
  const totalLength = polylineDistance(polygones);
  return polygones === null ? null : (
    <Polyline pathOptions={{ color: "red" }} positions={polygones} />
  );
};

const CreateMarker = ({ isActive }) => {
  const setWeatherLocation = useProjectStore(
    (state) => state.setWeatherLocation
  );
  const [position, setPosition] = useState<LatLngExpression>([1, 2]);
  const map = useMapEvents({
    click(e) {
      if (isActive) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        map.locate();
      }
    },
  });

  useEffect(() => {
    setWeatherLocation(position);
  }, [position, setWeatherLocation]);

  return (
    <Marker position={position}>
      <Popup>
        <div>Lat: {position[0]}</div>
        <div>Lon: {position[1]}</div>
      </Popup>
    </Marker>
  );
};

const CreateLocationMarker = ({ isActive }) => {
  const setProjectLocation = useProjectStore(
    (state) => state.setProjectLocation
  );
  const [position, setPosition] = useState<LatLngExpression>([1, 2]);
  const map = useMapEvents({
    click(e) {
      if (isActive) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        map.locate();
      }
    },
  });
  useEffect(() => {
    setProjectLocation(position);
  }, [position, setProjectLocation]);

  const location = new Icon({
    iconUrl: "https://www.svgrepo.com/show/127575/location-sign.svg",
    iconSize: [35, 35],
    iconAnchor: [10, 10], // point of the icon which will correspond to marker's location
  });

  return (
    <Marker position={position} icon={location}>
      <Popup>
        <div>Selected Coordinate:</div>
        <div>Lat: {position[0]}</div>
        <div>Lon: {position[1]}</div>
      </Popup>
    </Marker>
  );
};

const Map = ({ height, feature }) => {
  const position = [40.9, 38.39];
  return (
    <div style={{ width: "100%", height: height }}>
      <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CreateLocationMarker isActive={feature === 1} />
        <CreateMarker isActive={feature === 2} />
        <CreatePolyLine isActive={feature === 3} />
        {/* <CreatePolygon isActive={feat === "polygone"} /> */}
      </MapContainer>
    </div>
  );
};
export default Map;
