import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// chartjs
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line } from 'react-chartjs-2';
import VersionProjectChartReact from '../VersionProjectChartReact';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

export default function CostsCharts({ project }) {
	if (!project) return null;

	const data = {
		labels,
		datasets: project.filter(el => el.parent_id !== 0).map((el, i) => {
			const colors = ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)", "rgba(255, 159, 64, 1)", "rgba(255, 205, 86, 1)"];
			const backgroudColor = ["rgba(54, 162, 235, 0.5)", "rgba(255, 99, 132, 0.5)", "rgba(255, 159, 64, 0.5)", "rgba(255, 205, 86, 0.5)"];
			
			return {
				label: `V${i+1}`,
				data: Array.from(new Array(10)).map(el => random(0.0, 5.0)),
				borderColor: colors[i],
				backgroundColor: backgroudColor[i]
			}
		})
	}

	return (
		<>
			{project.filter(el => el.parent_id !== 0).map(el => (
				<Grid item xs={12} md={6} lg={4} key={el.id}>
					<Card>
						<CardHeader
							// sx={{ flexDirection: "column" }}
							title={
								<Typography
									variant="subtitle1"
									sx={{
										backgroundColor: "#cecece",
										width: "100%",
										p: "3px 7px",
										borderRadius: "4px",
										color: "floralwhite",
										textAlign: "center"
									}}
								>
									{el.name}
								</Typography>
							}
						/>
						<CardContent sx={{ p: 1, pt: 0 }}>
							<VersionProjectChartReact />
						</CardContent>
						{/* <CardActions>
							<Button size="small">Learn More</Button>
						</CardActions> */}
					</Card>
				</Grid>
			))}

			{/* comparacion de costos */}
			<Grid item xs={12} md lg marginBottom={6}>
				<Grid container>
					<Grid item xs={12}>
						<Paper variant="outlined" sx={{ padding: "6px 0", textAlign: "center" }}>
							<Typography>COMPARACION DE COSTOS</Typography>
						</Paper>
					</Grid>
					<Grid item xs={12}>
						<div style={{ width: "100%" }}>
							<Line options={options} data={data} />
						</div>
						{/* <VersionProjectChartReact /> */}
					</Grid>
				</Grid>
			</Grid>
		</>
	)
}

const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "bottom",
		},
		// title: {
		// 	display: true,
		// 	text: 'Chart.js Line Chart',
		// }
	}
}

const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}