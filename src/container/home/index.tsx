import { useNavigate } from "react-router-dom";
import classes from "./style.module.css";
import useProjectStore from "../../store/projectStore";
import { useEffect, useRef, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
const Home = () => {
  const ref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const updateName = useProjectStore((state) => state.updateProjectName);
  const nextStep = () => {
    updateName(ref?.current?.value || "Beach Nourishment");
    navigate("/map");
  };
  const [locations, setLocation] = useState<
    Array<{ display_name: string; lat: number; lon: number }>
  >([]);
  const { setProjectLocation } = useProjectStore();
  const [search, setSearch] = useState<string>("");
  const debouncedSearchTerm = useDebounce<string>(search, 200);
  const fetchLocations = async (l: string) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?addressdetails=1&q=${l}&format=jsonv2&limit=10`
    );
    const data = await res.json();
    setLocation(data);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchLocations(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className={classes.screen}>
      <h1 className={classes.app_name}>Beach Nourishment V1</h1>
      <div className={classes.container}>
        <h1 className={classes.project_name}>Project Name</h1>
        <input
          placeholder="Project Name"
          ref={ref}
          className={classes.project_name_input}
        />
        <input
          placeholder="Search Location"
          className={classes.project_name_input}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div>
          {locations?.map((l) => {
            return (
              <div
                onClick={() => {
                  setProjectLocation([l.lat, l.lon]);
                }}
                className={classes.location}
              >
                {l.display_name.slice(0, 50)}
              </div>
            );
          })}
        </div>
        <button className={classes.big_btn} onClick={nextStep}>
          Go to Project
        </button>
      </div>
    </div>
  );
};
export default Home;
