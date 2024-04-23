import { useNavigate } from "react-router-dom";
import classes from "./style.module.css";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.screen}>
      <h1 className={classes.app_name}>Beach Nourishment V1</h1>
      <div className={classes.container}>
        <h1 className={classes.project_name}>Project Name</h1>
        <input className={classes.project_name_input} />
        <button className={classes.big_btn} onClick={() => navigate("/map")}>
          Go to Project
        </button>
      </div>
    </div>
  );
};
export default Home;
