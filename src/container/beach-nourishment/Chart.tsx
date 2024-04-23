import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);
import { Line } from "react-chartjs-2";
import { arange } from "../../utils/arange";

const LineChart: React.FunctionComponent<{
  data: Array<Array<number>>;
  beach_length: number;
}> = ({ data, beach_length = 20 }) => {
  console.log(beach_length);
  const datas = {
    labels: arange(data.length + beach_length),
    datasets: [
      {
        label: "From Coast",
        data: data.map((m) => [m[0] + beach_length, m[1]]),
        fill: false,
        borderColor: "blue",
      },
      {
        label: "From Beach",
        data: data.map((m) => [m[0], m[1]]),
        fill: false,
        borderColor: "red",
      },
    ],
  };

  return (
    <div>
      <Line data={datas} />
    </div>
  );
};

export default LineChart;
