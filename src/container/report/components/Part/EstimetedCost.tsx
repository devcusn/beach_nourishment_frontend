import classes from "./style.module.css";
const EstimatedCost = () => {
  return (
    <div className={classes.estimeted_cost_container}>
      <div>
        In this project, we fill 146,444.33 m3 of sand without using sill and
        49,866.2 m3 of sand with using sill in our project. We made an average
        cost estimation for the operation, equipment, the cost of sand, sill,
        groins, and labor using beach nourishment or regulations previously made
        around the world.
      </div>
      <div> The unit cost was $19 /m3 for sand </div>
      <div>
        Unit cost was $42 /m3 for stone sill (our sill dimension = 200*1.5*1.5 =
        450 m3)
      </div>
      <div>
        Unit cost was $50 /m3 for the groin (our groin length is at least 87.5m,
        we selected 100m)
      </div>
      <div>
        **All unit costs include labor, operation, equipment, and material
        costs.
      </div>
      <b>When we use sill our cost will be:</b>
      <div>
        19* 49,866.2 +450*4+2*100*1*50= $412 ,189.8 + $1800 + $1000 = $950,257.8
      </div>
      <b>When we use sill our cost will be:</b>
      <div>19* 146,444.33 +2*100*1*50= $2,782,442.3 + $1000 = $2,783,442.3</div>
    </div>
  );
};
export default EstimatedCost;
