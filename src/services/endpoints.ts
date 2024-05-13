import { weatherApiKey } from "../env/env";

export const getWeather = async (lat: number, lon: number) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`
  );
  const resJson = await res.json();
  return resJson;
};
