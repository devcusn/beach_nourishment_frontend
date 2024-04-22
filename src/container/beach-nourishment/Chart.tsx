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

const LineChart: React.FunctionComponent<{
  data: Array<Array<number>>;
  data2: Array<Array<number>>;
}> = ({ data, data2 }) => {
  const x = data.map((m) => m[0]);
  const y = data.map((m) => m[1]);
  const x2 = data2.map((m) => m[0]);
  const y2 = data2.map((m) => m[1]);
  const datas = {
    labels: x,
    datasets: [
      {
        label: "Second dataset",
        data: y,
        fill: false,
        borderColor: "#742774",
      },
      {
        label: "Second dataset",
        data: y2,
        fill: false,
        borderColor: "#742774",
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
