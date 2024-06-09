/* eslint-disable @typescript-eslint/ban-types */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { WeatherModel } from "../models/types";
import { WeatherDefaultValues } from "./constants";
// type BeachModel = {
//   coords: Array<Array<number>>;
//   totalLength: number;
// };
type ProjectModel = {
  closure_depth_x: number;
  A: number;
  beach_length: number;
  total_length: number;
  closure_depth: number;
  matris: Array<Array<number>>;
  revetment_position: number;
};
interface ProjectState {
  name: string;
  project: ProjectModel;
  projectLocation: Array<number>;
  weatherLocation: Array<number>;
  weather: WeatherModel;
  shoreCoordinates: Array<Array<number>>;
  shoreLength: number;
  beachLength: number;
  setBeachLength: (l: number) => void;
  setShoreCoordinates: (coordinates: Array<Array<number>>) => void;
  updateProjectName: (name: string) => void;
  setProject: (project: ProjectModel) => void;
  setWeatherLocation: (location: Array<number>) => void;
  setProjectLocation: (location: Array<number>) => void;
  setShoreLength: (l: number) => void;
  setWeather: (weather: WeatherModel) => void;
}

const useProjectStore = create<ProjectState>()(
  persist(
    (set) => ({
      shoreLength: 0,
      beachLength: 0,
      name: "",
      weatherLocation: [0, 0],
      project: {
        closure_depth_x: 0,
        A: 0,
        beach_length: 0,
        total_length: 0,
        closure_depth: 0,
        matris: [],
        revetment_position: 0,
      },
      weather: WeatherDefaultValues,
      projectLocation: [0, 0],
      shoreCoordinates: [[]],
      setProject: (project: ProjectModel) => set(() => ({ project })),
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
