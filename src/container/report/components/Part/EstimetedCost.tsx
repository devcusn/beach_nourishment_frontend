import useProjectStore from "../../../../store/projectStore";
import classes from "./style.module.css";
const EstimatedCost = () => {
  const { project, shoreLength, beachLength } = useProjectStore();
  const volumeWithoutSill = project.volume.toFixed(2);
  const volumeWithSill = (project.volume_detail.c1 * shoreLength).toFixed(2);
  const sillDimension = (shoreLength * 1.5 * 1.5).toFixed(2);
  const shoreLengthFixed = shoreLength.toFixed(2);
  const beachLengthFixed = beachLength.toFixed(2);
  const sillCost =
    19 * Number(volumeWithSill) +
    Number(sillDimension) * 4 +
    2 * Number(beachLengthFixed) * 1 * 50;
  const withoutSillCost =
    19 * Number(volumeWithoutSill) + 2 * Number(shoreLengthFixed) * 1 * 50;
  return (
    <div className={classes.estimeted_cost_container}>
      <div>
        In this project, we fill {volumeWithoutSill} m3 of sand without using
        sill and {volumeWithSill}.2 m3 of sand with using sill in our project.
        We made an average cost estimation for the operation, equipment, the
        cost of sand, sill, groins, and labor using beach nourishment or
        regulations previously made around the world.`
      </div>
      <div> The unit cost was $19 /m3 for sand </div>
      <div>
        Unit cost was $42 /m3 for stone sill (our sill dimension =
        {shoreLength.toFixed(2)}
        *1.5*1.5 = {sillDimension} m3)
      </div>
      <div>
        Unit cost was $50 /m3 for the groin our groin length is at least
        {beachLengthFixed}m
      </div>
      <div>
        **All unit costs include labor, operation, equipment, and material
        costs.
      </div>
      <b>When we dont use sill our cost will be:</b>
      <div>
        19 * {volumeWithSill} + {sillDimension} * 4 + 2 * {beachLengthFixed} * 1
        * 50 = ${sillCost.toFixed(2)}
      </div>
      <b>When we use sill our cost will be:</b>
      <div>
        19 * {volumeWithoutSill}+ 2 * {shoreLengthFixed} * 1 * 50= $2,782,442.3
        + $1000 = ${withoutSillCost.toFixed(2)}
      </div>
    </div>
  );
};
export default EstimatedCost;
