import useProjectStore from "../../store/projectStore";

const Weather = () => {
  const weather = useProjectStore((state) => state.weather);
  console.log(weather);
  return (
    <div>
      <h4>Wind Data</h4>
      <div>Wind Speed: {weather.wind.speed}</div>
      <div>Wind Gust: {weather.wind.gust}</div>
      <div>Wind Deg: {weather.wind.deg} </div>
    </div>
  );
};
export default Weather;
