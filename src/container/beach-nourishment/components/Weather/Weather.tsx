import useProjectStore from "../../../../store/projectStore";
import OutPut from "./OutPut";

const Weather = () => {
  const weather = useProjectStore((state) => state.weather);
  return (
    <>
      <table style={{ width: "100%", padding: "20px 0px" }}>
        <h3>Weather Data Resource</h3>
        <OutPut label="Data Center" value={weather.base} />
        <h4>Wind Data</h4>
        <OutPut label="Wind Speed " value={`${weather.wind.speed} km/s`} />
        <OutPut label="Wind Gust" value={weather.wind.gust} />
        <OutPut label="Wind Def" value={`${weather.wind.deg}°`} />

        <h4>Tempature</h4>
        <OutPut label="Temp" value={`${weather.main.temp} K`} />
        <OutPut label="Feels Like" value={`${weather.main.feels_like} K `} />
        <OutPut label="Temp Max" value={`${weather.main.temp_max} K `} />
        <OutPut label="Temp Min" value={`${weather.main.temp_min} K `} />
        <h4>Main</h4>
        <OutPut label="Pressure" value={`${weather.main.pressure}`} />
        <OutPut label="Humidity" value={`${weather.main.humidity}`} />
        <h4>Level</h4>
        <OutPut label="Sea Level" value={`${weather.main.sea_level}`} />
        <OutPut label="Grnd Level " value={`${weather.main.grnd_level}`} />
      </table>
    </>
  );
};
export default Weather;
