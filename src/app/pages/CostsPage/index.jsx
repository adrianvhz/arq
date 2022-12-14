import { useState } from "react";
import { useParams } from "react-router-dom";
import Grid from '@mui/material/Unstable_Grid2';
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TableProjects from "../../components/GridData/TableProjects";
import CostsCharts from "./views/CostsCharts";
import CostsTables from "./views/CostsTables";
// tabla de seleccionar costos
import TableCosts from "./TableCosts";
import { useSelector } from "react-redux";

export function CostsPage() {
	const [slot, setSlot] = useState("dashboard");
	const [costs, setCosts] = useState(null);

    const params = useParams();
	const projects = useSelector(state => state.project.projects);
	const project = projects.filter(el => el.id === Number(params.id) || el.parent_id === Number(params.id));
	console.log("cosits");
	const handleCosts = (newCosts) => {
		setCosts(newCosts);
	}

	return (
		<Grid container spacing={2}>
			{/* row 1 */}
			<Grid item xs={12} display="flex" justifyContent="space-between">
				<TableCosts handleCosts={handleCosts} />
				<Typography variant="h6" fontWeight={700}>MODELO FINANCIERO INTEGRADO</Typography>
				<Stack direction="row">
					<Button
						size="small"
						onClick={() => setSlot('dashboard')}
						color={slot === 'dashboard' ? 'primary' : 'secondary'}
						variant={slot === 'dashboard' ? 'outlined' : 'text'}
					>
						dashboard
					</Button>
					<Button
						size="small"
						onClick={() => setSlot('costos')}
						color={slot === 'costos' ? 'primary' : 'secondary'}
						variant={slot === 'costos' ? 'outlined' : 'text'}
					>
						costos
					</Button>
				</Stack>
			</Grid>

			<Grid item xs={12}>
				<TableProjects projectsFiltrados={project} initialShow={true} />
			</Grid>

			{/* row 2 */}
			{
				slot === "dashboard"
				? <CostsCharts project={project} />
				: <CostsTables project={project} costs={costs} />
			}
		</Grid>
	)
}
