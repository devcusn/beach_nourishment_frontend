import classes from "./style.module.css";

const OutPut = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  return (
    <tr className={classes.output}>
      <td className={classes.output_label}>{label}:</td>
      <td className={classes.output_value}>{value}</td>
    </tr>
  );
};
export default OutPut;
