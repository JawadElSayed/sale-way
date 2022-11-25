import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
);

const LineGraph = ({ labels, graphData }) => {
	const data = {
		labels: labels,
		datasets: [
			{
				label: "Clicks",
				data: graphData,
				tension: 0.4,
				backgroundColor: ["rgba(155, 169, 243,0.2)"],
				borderColor: ["rgba(155, 169, 243,0.4)"],
				pointBackgroundColor: ["rgb(155, 169, 243)"],
				pointBorderColor: ["rgb(155, 169, 243)"],
				fill: true,
			},
		],
	};

	return <Line data={data} />;
};

export default LineGraph;
