import { useNavigate } from "react-router-dom";
import classes from "./style.module.css";
import useProjectStore from "../../store/projectStore";
import { useRef } from "react";
const Home = () => {
  const ref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const updateName = useProjectStore((state) => state.updateProjectName);
  const nextStep = () => {
    updateName(ref?.current?.value || "Beach Nourishment");
    navigate("/map");
  };
  return (
    <div className={classes.screen}>
      <h1 className={classes.app_name}>Beach Nourishment V1</h1>
      <div className={classes.container}>
        <h1 className={classes.project_name}>Project Name</h1>
        <input ref={ref} className={classes.project_name_input} />
        <button className={classes.big_btn} onClick={nextStep}>
          Go to Project
        </button>
      </div>
    </div>
  );
};
export default Home;
