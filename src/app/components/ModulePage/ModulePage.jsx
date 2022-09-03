import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import React, { useEffect, useState } from 'react';
import GridData from '../GridData/GridData';
import AddIcon from '@mui/icons-material/Add';
import styled from '@mui/material/styles/styled';
import NewProject from '../NewProject/NewProject'
import { Link as RouterLink } from "react-router-dom";
import { plataformAxios } from '../../../services/zonesService';


const ModulePage = ({ pagina }) => {

	const [project, setProject] = useState(null)
	const [loading, setLoading] = useState(true)

	const getZones = async () => {
		const data = await plataformAxios.get(`projects`);
		setProject(data.data);
		if (data) {
			setLoading(false);
		}
	}


	useEffect(() => {
		getZones();
	}, []);

	if (loading) { return <div>Cargando...</div> }

   return (
		<Card sx={{
			width: '100%',
			height: '100%',
		}}>
			{/* <Container> */}
			<div style={{margin: "0 2rem"}}>

					{/* <h4>
						CREAR UN DISEÑO
					</h4>
					<Box sx={
						{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
						}
					} >
						<span>
							Puedes crear desde 0 o escoger una plantilla del proyecto
						</span>
						<NewProject />
					</Box> */}




				{/* CLEAR */}
				<div className="flex" style={{marginBottom: "1.75rem", marginTop: "2rem"}}>
					<div>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<div>
								<h4>CREAR UN DISEÑO</h4>
								<span>Puedes crear desde cero o escoger una plantilla de proyecto</span>
							</div>
							<div style={{alignSelf: "end"}}>
								{/* <ColorButton variant="contained" size="large" data-toggle="modal">
									<AddIcon />
									&nbsp; Nuevo
								</ColorButton> */}
								<NewProject />
							</div>
						</div>
						<div style={{marginBottom: "3.75rem"}}></div>
					</div>
				</div>
				{/* CLEAR */}




					{/* <h4>
						MIS DISEÑOS
					</h4>
					<span>
						Revisa los ultimos diseños realizados
					</span> */}



				{/* CLEAR */}
				<div>
					<div style={{marginBottom: "1.75rem"}}>
						<h4>MIS DISEÑOS</h4>
						<span>Revisa los últimos diseños realizados</span>
					</div>

					<Grid container spacing={3} sx={{marginBottom: "1.75rem"}}>
						<Grid item xs={4}>
							<label>Buscar</label>
							<input type="text" placeholder="Escribe aquí" style={{width: "100%"}} />
						</Grid>
						<Grid item xs={3}>
							<label>Desde</label>
							<input type="date" className="" style={{width: "100%"}} />
						</Grid>
						<Grid item xs={3}>
							<label>Hasta</label>
							<input type="date" className="" style={{width: "100%"}} />
						</Grid>
						<Grid item xs={2}>
							<label>Mostrar</label>
							<select style={{width: "100%"}}>
								<option value="0">Todos</option>
								<option value="10">10</option>
								<option value="50">50</option>
								<option value="100">100</option>
							</select>
						</Grid>
					</Grid>
				</div>
				{/* CLEAR */}
			{/* </Container> */}
			</div>
			<GridData data={project}></GridData>

			
		</Card>
	)
}



// const ColorButton = styled(Button)({
// 	borderRadius: ".42rem",
// 	color: "#ffffff",
// 	padding: ".60rem 1rem",
// 	fontFamily: "inherit",
// 	textTransform: "none",
// 	border: "1px solid #1BC5BD",
// 	boxShadow: "none",
// 	backgroundColor: "#1BC5BD",
// 	'&:hover': {
// 		backgroundColor: "#2cb4ad",
// 		boxShadow: "none"
// 	}
// })


export default ModulePage