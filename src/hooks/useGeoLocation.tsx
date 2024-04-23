import { useEffect, useState } from "react";

const useGeoLocation = () => {
  const [position, setPosition] = useState([0, 0]);
  useEffect(() => {
    setTimeout(() => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
          setPosition([position.coords.latitude, position.coords.longitude]);
        });
      } else {
        console.log("Geolocation is not available in your browser.");
      }
    }, 2000);
  }, []);

  return position;
};
export default useGeoLocation;
