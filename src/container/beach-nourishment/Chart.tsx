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

const LineChart: React.FunctionComponent<{ data: Array<Array<number>> }> = ({
  data,
}) => {
  const x = data.map((m) => m[0]);
  const y = data.map((m) => m[1]);
  const datas = {
    labels: x,
    datasets: [
      {
        label: "Second dataset",
        data: y,
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
