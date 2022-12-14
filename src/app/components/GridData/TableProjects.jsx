import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Icon from "@mui/material/Icon";
import SchoolIcon from '@mui/icons-material/School';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupsIcon from '@mui/icons-material/Groups';
import { RowList } from './RowList';

const dataBoxGrid = {
    width: "100%",
    display: "flex"
}

const styleGrid = {
    border: "1.5px solid #AFAFAF",
    fontSize: "14px",
    padding: "8px 6px",
    minWidth: "20px",
	color: "#000000",
    fontWeight: 550,
}

const styleGrid2 = {
    border: "1.5px solid #AFAFAF",
    width: "100%",
    fontSize: "14px",
    padding: "8px 6px",
    minWidth: "20px",
}

export default function TableProjects({ projectsFiltrados, typeProject, setMutate, initialShow }) {
	return (
		<Box sx={{
			width: "100%",
			overflowX: "auto",
		}}>

			<div style={dataBoxGrid}>
				<Box sx={{ ...styleGrid, width: "5%", minWidth: "50px" }}>
					ID
				</Box>
				<Box sx={{ ...styleGrid, width: "5%", minWidth: "50px" }}>
					Tipo
				</Box>
				<Box sx={{ ...styleGrid, minWidth: "180px", width: "20%" }}>
					Nombre del Proyecto
				</Box>
				<Box sx={{ ...styleGrid, minWidth: "100px", width: "10%" }}>
					Ubicacion
				</Box>
				<Box sx={{ ...styleGrid, minWidth: "150px", width: "10%" }}>
					Responsable
				</Box>
				<Box sx={{ ...styleGrid, minWidth: "120px", width: "15%" }}>
					Fecha de Elab.
				</Box>
				<Box sx={{ ...styleGrid, minWidth: "120px", width: "15%" }}>
					Fecha de Act.
				</Box>
				<Box sx={{ ...styleGrid, minWidth: "150px", width: "20%" }}>
					Nombre del Cliente
				</Box>
				<Box sx={{ ...styleGrid, minWidth: "50px", width: "10%" }}>
					Acciones
				</Box>
			</div>
			{projectsFiltrados
				? projectsFiltrados.map((row, index) =>
					<RowList
						key={index}
						index={index}
						row={row}
						projectsFiltrados={projectsFiltrados}
						setMutate={setMutate}
						initialShow={initialShow}
						// icon={typeProject.icon}
					/>
				)
				: Array.from(new Array(5)).map((el, index) => (
					<div key={index}>
						<div
							style={{
							width: "100%",
							display: "flex"
						}}>
							<Box sx={{ ...styleGrid2, width: "5%", minWidth: "50px" }}>
								<Skeleton variant="rounded" />
							</Box>
							<Box sx={{ ...styleGrid2, width: "5%", minWidth: "50px" }}>
								<Icon>
									<SchoolIcon />
								</Icon>
							</Box>
							<Box sx={{ ...styleGrid2, minWidth: "180px", width: "20%", cursor: "pointer" }} onClick={() => setShow(!show)}>
								<Skeleton variant="rounded" />
							</Box>
							<Box sx={{ ...styleGrid2, minWidth: "100px", width: "10%" }}>
								<Skeleton variant="rounded" />
							</Box>
							<Box sx={{ ...styleGrid2, minWidth: "150px", width: "10%" }}>
								<Skeleton variant="rounded" />
							</Box>
							<Box sx={{ ...styleGrid2, minWidth: "120px", width: "15%" }}>
								<Skeleton variant="rounded" />
							</Box>
							<Box sx={{ ...styleGrid2, minWidth: "120px", width: "15%" }}>
								<Skeleton variant="rounded" />
							</Box>
							<Box sx={{ ...styleGrid2, minWidth: "150px", width: "20%" }}>
								<Skeleton variant="rounded" />
							</Box>
							<Box sx={{ ...styleGrid2, minWidth: "50px", width: "10%" }}>
								<AddIcon />
								<GroupsIcon />
								<DeleteIcon />
							</Box>
						</div>
					</div>
				))
			}
		</Box>
	)
}
