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
//import LocationIcon from "../../assets/location-sign.svg";
import { MapFeatureProps, MapProps } from "./types";

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

const CreatePolyLine: React.FunctionComponent<MapFeatureProps> = ({
  isActive,
}) => {
  const [polygones, setpolygonesPoints] = useState<Array<Array<number>>>([]);

  const map = useMapEvents({
    click(e) {
      if (isActive) {
        setpolygonesPoints((prev) => [...prev, [e.latlng.lat, e.latlng.lng]]);
        map.locate();
      }
    },
  });
  const { setShoreCoordinates, setShoreLength } = useProjectStore();

  useEffect(() => {
    if (isActive) {
      setShoreCoordinates(polygones);
      setShoreLength(polylineDistance(polygones));
    }
  }, [isActive, polygones, setShoreCoordinates, setShoreLength]);

  return polygones === null ? null : (
    <Polyline
      pathOptions={{ color: "red" }}
      positions={polygones as LatLngExpression[]}
    />
  );
};

const CreateMarker: React.FunctionComponent<MapFeatureProps> = ({
  isActive,
}: {
  isActive: boolean;
}) => {
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
    if (isActive) {
      setWeatherLocation(position as Array<number>);
    }
  }, [isActive, position, setWeatherLocation]);

  return (
    <Marker position={position}>
      <Popup>
        <div>Lat: {(position as Array<number>)[0]}</div>
        <div>Lon: {(position as Array<number>)[1]}</div>
      </Popup>
    </Marker>
  );
};

const CreateLocationMarker: React.FunctionComponent<MapFeatureProps> = ({
  isActive,
}) => {
  const { setProjectLocation, projectLocation } = useProjectStore();
  const map = useMapEvents({
    click(e) {
      if (isActive) {
        setProjectLocation([e.latlng.lat, e.latlng.lng]);
        map.locate();
      }
    },
  });

  const location = new Icon({
    iconUrl: "https://www.svgrepo.com/show/127575/location-sign.svg",
    iconSize: [35, 35],
    iconAnchor: [10, 10], // point of the icon which will correspond to marker's location
  });

  return (
    <Marker position={projectLocation as LatLngExpression} icon={location}>
      <Popup>
        <div>Selected Coordinate:</div>
        <div>Lat: {projectLocation[0]}</div>
        <div>Lon: {projectLocation[1]}</div>
      </Popup>
    </Marker>
  );
};

const CreateLine: React.FunctionComponent<MapFeatureProps> = ({ isActive }) => {
  const [polygones, setpolygonesPoints] = useState<Array<Array<number>>>([]);

  const map = useMapEvents({
    click(e) {
      if (isActive) {
        setpolygonesPoints((prev) => [...prev, [e.latlng.lat, e.latlng.lng]]);
        map.locate();
      }
    },
  });
  const { setBeachLength } = useProjectStore();

  useEffect(() => {
    if (isActive) {
      if (polygones.length > 0) {
        setBeachLength(polylineDistance(polygones));
      }
    }
  }, [isActive, polygones, setBeachLength]);

  return polygones === null ? null : (
    <Polyline
      pathOptions={{ color: "blue" }}
      positions={polygones as LatLngExpression[]}
    />
  );
};

const Map: React.FunctionComponent<MapProps> = ({ height, feature }) => {
  const position = useProjectStore((state) => state.projectLocation);
  return (
    <div style={{ width: "100%", height: height }}>
      <MapContainer
        center={position as LatLngExpression}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CreateLocationMarker isActive={feature === 1} />
        <CreateMarker isActive={feature === 2} />
        <CreatePolyLine isActive={feature === 3} />
        <CreateLine isActive={feature === 4} />
        {/* <CreatePolygon isActive={feat === "polygone"} /> */}
      </MapContainer>
    </div>
  );
};
export default Map;
