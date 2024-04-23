import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProjectState {
  name: string;
  updateProjectName: (name: string) => void;
}

const useProjectStore = create<ProjectState>()(
  persist(
    (set) => ({
      name: "",
      updateProjectName: (name) => set(() => ({ name: name })),
    }),
    { name: "projectStore" }
  )
);

export default useProjectStore;
