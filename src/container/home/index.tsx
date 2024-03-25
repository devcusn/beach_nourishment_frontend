import Header from "../../layout/Header/Header";
import classes from "./index.module.css";
import BeachImg from "../../assets/beach.jpeg";
import RenewableImg from "../../assets/renevable.jpeg";
import GeoImg from "../../assets/geotec.jpeg";
import ReinImg from "../../assets/reinforcement.jpeg";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div>
        <div className={classes.products}>
          <div
            className={classes.product}
            onClick={() => navigate("/beach-nourishment")}
          >
            <img src={BeachImg} width="100%" />
            <div className={classes.product_title}> BEACH NOURISHMENT</div>
          </div>
          <div className={classes.product}>
            <img src={RenewableImg} width="100%" />
            <div className={classes.product_title}> RENEWABLE ENERGY</div>
          </div>
          <div className={classes.product}>
            <img src={ReinImg} width="100%" />
            <div className={classes.product_title}>REINFORCEMENT CONCRETE</div>
          </div>
          <div className={classes.product}>
            <img src={GeoImg} width="100%" />
            <div
              className={classes.product_title}
              onClick={() => navigate("/soil-ai")}
            >
              GEOTECHNICAL ENGINEERING
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
