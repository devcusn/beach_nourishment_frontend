import classes from "./style.module.css";

const Loader = () => {
  return (
    <div className={classes.loader_container}>
      <div className={classes.loader}></div>
      <div className={classes.loader_description}>
        Your analysis is still being processed, please wait
      </div>
    </div>
  );
};
export default Loader;
