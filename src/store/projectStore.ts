import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProjectState {
  name: string;
  project: {
    closure_depth_x: number;
    A: number;
    beach_length: number;
  };
  updateProjectName: (name: string) => void;
  setProject: (project: object) => void;
}

const useProjectStore = create<ProjectState>()(
  persist(
    (set) => ({
      name: "",
      project: { closure_depth_x: 0, A: 0, beach_length: 0 },
      setProject: (project) => set(() => ({ project })),
      updateProjectName: (name) => set(() => ({ name: name })),
    }),
    { name: "projectStore" }
  )
);

export default useProjectStore;
