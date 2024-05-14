/* eslint-disable @typescript-eslint/ban-types */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { WeatherModel } from "../models/types";
type BeachModel = {
  coords: Array<Array<number>>;
  totalLength: number;
};
interface ProjectState {
  name: string;
  project: {
    closure_depth_x: number;
    A: number;
    beach_length: number;
  };
  projectLocation: Array<number>;
  weatherLocation: Array<number>;
  weather: WeatherModel;
  beachData: BeachModel;
  updateProjectName: (name: string) => void;
  setProject: (project: object) => void;
  setWeatherLocation: (location: Array<number>) => void;
  setProjectLocation: (location: Array<number>) => void;
  setWeather: (weather: WeatherModel) => void;
  setBeachData: (beachData: BeachModel) => void;
}

const useProjectStore = create<ProjectState>()(
  persist(
    (set) => ({
      name: "",
      weatherLocation: [0, 0],
      project: { closure_depth_x: 0, A: 0, beach_length: 0 },
      weather: { a: 10 },
      projectLocation: [0, 0],
      setProject: (project) => set(() => ({ project })),
      updateProjectName: (name) => set(() => ({ name: name })),
      setWeatherLocation: (location: Array<number>) =>
        set(() => ({ weatherLocation: location })),
      setWeather: (weather: WeatherModel) => set(() => ({ weather: weather })),
      setProjectLocation: (location: Array<number>) =>
        set(() => ({ projectLocation: location })),
    }),
    { name: "projectStore" }
  )
);

export default useProjectStore;
