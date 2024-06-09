import { WeatherModel } from "../models/types";

export const WeatherDefaultValues: WeatherModel = {
  coord: {
    lon: 0,
    lat: 0,
  },
  weather: [
    {
      id: 0,
      main: "Clear",
      description: "clear sky",
      icon: "01d",
    },
  ],
  base: "stations",
  main: {
    temp: 0,
    feels_like: 0,
    temp_min: 0,
    temp_max: 0,
    pressure: 1013,
    humidity: 0,
    sea_level: 0,
    grnd_level: 0,
  },
  visibility: 10000,
  wind: {
    speed: 0,
    deg: 0,
    gust: 0,
  },
  rain: {
    "1h": 0,
  },
  clouds: {
    all: 0,
  },
  dt: 0,
  sys: {
    sunrise: 0,
    sunset: 0,
  },
  timezone: 0,
  id: 0,
  name: "",
  cod: 200,
};
