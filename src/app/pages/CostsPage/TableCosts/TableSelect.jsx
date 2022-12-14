import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import "./TableSelect.css"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		// backgroundColor: theme.palette.common.black,
		backgroundColor: "rgb(5, 36, 92)",
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));
  
function createData(muros_y_columnas, techos, puertas_y_ventanas, revestimientos, baños, inst_elect_y_sanit, categoria) {
	return {
		muros_y_columnas: <input type="radio" name="muros_y_columnas" value={muros_y_columnas} style={{ display: "inline" }} />,
		techos: <input type="radio" name="techos" value={techos} style={{ display: "inline" }} />,
		puertas_y_ventanas: <input type="radio" name="puertas_y_ventanas" value={puertas_y_ventanas} style={{ display: "inline" }} />,
		revestimientos: <input type="radio" name="revestimientos" value={revestimientos} style={{ display: "inline" }} />,
		baños: <input type="radio" name="baños" value={baños} style={{ display: "inline" }} />,
		inst_elect_y_sanit: <input type="radio" name="inst_elect_y_sanit" value={inst_elect_y_sanit} style={{ display: "inline" }} />,
		categoria
	}
}
  
const rows = [
	createData(588.68, 357.54, 319.48, 344.34, 116.20, 341.50, "A"),
	createData(379.54, 233.27, 168.39, 260.90, 88.35, 249.34, "B"),
	createData(261.26, 192.72, 108.84, 193.54, 61.29, 157.30, "C"),
	createData(252.64, 122.32, 95.33, 148.50, 32.70, 99.37, "D"),
	createData(177.86, 45.60, 81.57, 102.17, 19.23, 72.17, "E"),
	createData(133.95, 25.08, 61.24, 72.02, 14.32, 41.29, "F"),
	createData(78.92, 17.24, 33.08, 59.05, 9.85, 38.29, "G")
];

export default function TableSelect() {
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 700 }} aria-label="customized table">
				<TableHead>
					<TableRow>
						<StyledTableCell align="center" colSpan={2}>ESTRUCTURAS</StyledTableCell>
						<StyledTableCell align="center" colSpan={3}>ACABADOS</StyledTableCell>
						<StyledTableCell align="center" colSpan={2}>-</StyledTableCell>
					</TableRow>
					<TableRow>
						<StyledTableCell align="center">MUROS Y COLUMNAS</StyledTableCell>
						<StyledTableCell align="center">TECHOS</StyledTableCell>
						<StyledTableCell align="center">PUERTAS Y VENTANAS</StyledTableCell>
						<StyledTableCell align="center">REVESTIMIENTOS</StyledTableCell>
						<StyledTableCell align="center">BAÑOS</StyledTableCell>
						<StyledTableCell align="center">INSTALACIONES ELECTRICAS Y SANITARIAS</StyledTableCell>
						<StyledTableCell align="center">CATEGORIA</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row, i) => (
					<StyledTableRow key={i}>
						<StyledTableCell component="th" scope="row" align="center">
							{row.muros_y_columnas}
						</StyledTableCell>
						<StyledTableCell align="center">{row.techos}</StyledTableCell>
						<StyledTableCell align="center">{row.puertas_y_ventanas}</StyledTableCell>
						<StyledTableCell align="center">{row.revestimientos}</StyledTableCell>
						<StyledTableCell align="center">{row.baños}</StyledTableCell>
						<StyledTableCell align="center">{row.inst_elect_y_sanit}</StyledTableCell>
						<StyledTableCell align="center">{row.categoria}</StyledTableCell>
					</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}


<ul>
  <li>
    <input type="radio" id="f-option" name="selector" />
    <label for="f-option">Pizza</label>
    
    <div class="check"></div>
  </li>
  
  <li>
    <input type="radio" id="s-option" name="selector" />
    <label for="s-option">Bacon</label>
    
    <div class="check"><div class="inside"></div></div>
  </li>
  
  <li>
    <input type="radio" id="t-option" name="selector" />
    <label for="t-option">Cats</label>
    
    <div class="check"><div class="inside"></div></div>
  </li>
</ul>