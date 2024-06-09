import { useNavigate } from "react-router-dom";
import classes from "./style.module.css";
import { features } from "./constant";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className={classes.header}>
        <div className={classes.title}>CivilSoft</div>
        <div className={classes.menu}>
          <button
            onClick={() => navigate("/project")}
            className={classes.create_project_btn}
          >
            Create Project
          </button>
        </div>
      </div>
      <div className={classes.landing_area}>
        <div className={classes.app_brand}>
          <div className={classes.app_title}>Beach Nourishment V1</div>
          <div className={classes.app_description}>
            Coastal Engineering tool for Beach Nourishment
          </div>
        </div>
        <div className={classes.features}>
          <h3 className={classes.features_title}>Features</h3>
          <div className={classes.features_list}>
            {features.map((f) => (
              <span className={classes.feature}>{f}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
