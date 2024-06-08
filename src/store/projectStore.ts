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
  shoreCoordinates: Array<Array<number>>;
  shoreLength: number;
  beachLength: number;
  setBeachLength: (l: number) => void;
  setShoreCoordinates: (coordinates: Array<Array<number>>) => void;
  updateProjectName: (name: string) => void;
  setProject: (project: object) => void;
  setWeatherLocation: (location: Array<number>) => void;
  setProjectLocation: (location: Array<number>) => void;
  setShoreLength: (l: number) => void;
  setWeather: (weather: WeatherModel) => void;
  setBeachData: (beachData: BeachModel) => void;
}

const useProjectStore = create<ProjectState>()(
  persist(
    (set) => ({
      shoreLength: 0,
      beachLength: 0,
      name: "",
      weatherLocation: [0, 0],
      project: { closure_depth_x: 0, A: 0, beach_length: 0 },
      weather: {},
      projectLocation: [0, 0],
      shoreCoordinates: [[]],
      setProject: (project) => set(() => ({ project })),
      updateProjectName: (name) => set(() => ({ name: name })),
      setWeatherLocation: (location: Array<number>) =>
        set(() => ({ weatherLocation: location })),
      setWeather: (weather: WeatherModel) => set(() => ({ weather: weather })),
      setProjectLocation: (location: Array<number>) =>
        set(() => ({ projectLocation: location })),
      setShoreCoordinates: (coordinates: Array<Array<number>>) =>
        set(() => ({ shoreCoordinates: coordinates })),
      setShoreLength: (l: number) => set(() => ({ shoreLength: l })),
      setBeachLength: (l: number) => set(() => ({ beachLength: l })),
    }),
    { name: "projectStore" }
  )
);

export default useProjectStore;
