/* eslint-disable @typescript-eslint/ban-types */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { WeatherModel } from "../models/types";

interface ProjectState {
  name: string;
  project: {
    closure_depth_x: number;
    A: number;
    beach_length: number;
  };
  weatherLocation: Array<number>;
  weather: WeatherModel;
  updateProjectName: (name: string) => void;
  setProject: (project: object) => void;
  setWeatherLocation: (location: Array<number>) => void;
  setWeather: (weather: WeatherModel) => void;
}

const useProjectStore = create<ProjectState>()(
  persist(
    (set) => ({
      name: "",
      weatherLocation: [0, 0],
      project: { closure_depth_x: 0, A: 0, beach_length: 0 },
      weather: { a: 10 },
      setProject: (project) => set(() => ({ project })),
      updateProjectName: (name) => set(() => ({ name: name })),
      setWeatherLocation: (location: Array<number>) =>
        set(() => ({ weatherLocation: location })),
      setWeather: (weather: WeatherModel) => set(() => ({ weather: weather })),
    }),
    { name: "projectStore" }
  )
);

export default useProjectStore;
