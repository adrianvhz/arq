import { Bar, Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

const data = [
	{
		id: 0,
		year: 2015,
		gain: 30000,
		loss: 2000
	},
	{
		id: 1,
		year: 2016,
		gain: 10000,
		loss: 800
	},
	{
		id: 2,
		year: 2017,
		gain: 50000,
		loss: 3000
	},
	{
		id: 3,
		year: 2018,
		gain: 40000,
		loss: 3400
	},
	{
		id: 4,
		year: 2019,
		gain: 70000,
		loss: 4550
	},
	{
		id: 5,
		year: 2020,
		gain: 20000,
		loss: 1800
	}
]

export default function VersionProjectChartReact() {
	return (
		<div style={{ width: "100%" }}>
			<Bar
				data={{
					labels: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24],
					datasets: [
						{
							label: "Costos",
							data: [0, 2, 6, 2, 10, 2].concat([8, 4, 8, 0, 6, 4]),

							// borderColor: "#78ab78",
							animation: {
								delay: 100
							}
						}
					]
				}}
				options={{
					plugins: {
						legend: {
							display: false
						}
					}
				}}
			/>
		</div>
	)
}
