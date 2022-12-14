import { Fragment } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(type, totalCost) {
	return { type, totalCost }
}

export default function CostsTables({ project, costs }) {
	console.log("costs", costs)
	const rows = [
		createData("Costo total de la estructura del edificio", `S/${Number(costs.inst_elect_y_sanit) + Number(costs.techos)}`),
		createData('Costo total del trabajo en el sitio', "S/0.00"),
		createData('Costo total', "S/0.00"),
		createData('Sobrecarga del sitio', "S/0.00"),
		createData('Subsidio por inflacion', "S/0.00"),
		createData('COSTO TOTAL DE CONSTRUCCION', "S/0.00"),
	];

	if (!project) return null;

	return (
		project.filter(el => el.parent_id !== 0).map(el => (
			<Fragment key={el.id}>
				<Grid item xs={12}>{el.name}</Grid>
				<Grid item xs={12}>
					{/* <Stack> */}
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
							<TableHead>
								<TableRow>
									<TableCell>TIPO</TableCell>
									<TableCell align="right">COSTO TOTAL</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map((row) => (
									<TableRow
										key={row.type}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									>
										<TableCell component="th" scope="row">
											{row.type}
										</TableCell>
										<TableCell align="right">{row.totalCost}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					{/* </Stack> */}
				</Grid>
			</Fragment>
		))
	)
}
