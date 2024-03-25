import Logo from "../../assets/logo.jpeg";

import classes from "./style.module.css";
const Header = () => {
  return (
    <div className={classes.header}>
      <img src={Logo} width={60} height={60} style={{ borderRadius: "50%" }} />
      <h1 className={classes.header_logo__title}>
        CESOFT
        <span className={classes.header_logo__subtitle}>
          Civil Engineering Software
        </span>
      </h1>
    </div>
  );
};

export default Header;
