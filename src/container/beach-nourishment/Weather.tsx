import useProjectStore from "../../store/projectStore";

const Weather = () => {
  const weather = useProjectStore((state) => state.weather);
  console.log(weather);
  return (
    <div>
      <h4>Weather Data Resource</h4>
      <div>Data Center: {weather.base}</div>
      <hr />
      <h4>Wind Data</h4>
      <div>Wind Speed: {weather.wind.speed}</div>
      <div>Wind Gust: {weather.wind.gust}</div>
      <div>Wind Deg: {weather.wind.deg} </div>
      <hr />
      <h4>Tempature</h4>
      <div>Temp: {weather.main.temp}</div>
      <div>Feels Like: {weather.main.feels_like}</div>
      <div>Temp Max: {weather.main.temp_max}</div>
      <div>Temp Min: {weather.main.temp_min}</div>
      <h4>Main</h4>
      <div>Pressure: {weather.main.pressure}</div>
      <div>Humidity: {weather.main.humidity}</div>
      <h4>Level</h4>
      <div>Sea Level: {weather.main.sea_level}</div>
      <div>Ground Level: {weather.main.grnd_level}</div>
    </div>
  );
};
export default Weather;
