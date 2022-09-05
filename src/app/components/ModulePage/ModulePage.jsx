import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import GridData from '../GridData/GridData';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import NewProject from '../NewProject/NewProject'
import { plataformAxios } from '../../../services/zonesService';


const ModulePage = ({ pagina }) => {
	const [project, setProject] = useState(null)


	const dataFilterType = (data) => {
		switch (pagina) {
			case 'educacion':
				setProject(data.filter((item) => item.type_id == '1'))
				break;
			case 'salud':
				setProject(data.filter((item) => item.type_id == '2'))
				break;
			case 'infraestructura':
				setProject(data.filter((item) => item.type_id == '3'))
				break;
			default:
				setProject(data)
				break;
		}
	}

	const getProjects = async () => {
		const data = await plataformAxios.get(`projects`);
		if (data) {
			dataFilterType(data.data.proyectos)

		}
	}

	useEffect(() => {
		getProjects();
	}, []);


	if (!project) { return <div>Cargando...</div> }

	return (
		<Card sx={{
			width: '100%',
			height: '100%',
		}}>
			<Container>

				{/* CLEAR */}
				<div className="flex" style={{ marginBottom: "1.75rem", marginTop: "2rem" }}>
					<div>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<div>
								<h4>CREAR UN DISEÑO</h4>
								<span>Puedes crear desde cero o escoger una plantilla de proyecto</span>
							</div>
							<div style={{ alignSelf: "end" }}>
								<NewProject />
							</div>
						</div>
						<div style={{ marginBottom: "3.75rem" }}></div>
					</div>
				</div>



				<div>
					<div style={{ marginBottom: "1.75rem" }}>
						<h4>MIS DISEÑOS</h4>
						<span>Revisa los últimos diseños realizados</span>
					</div>
				</div>
			</Container>


			<GridData data={project}></GridData>




		</Card>
	)
}



const ColorButton = styled(Button)({
	borderRadius: ".42rem",
	color: "#ffffff",
	padding: ".60rem 1rem",
	fontFamily: "inherit",
	textTransform: "none",
	border: "1px solid #1BC5BD",
	boxShadow: "none",
	backgroundColor: "#1BC5BD",
	'&:hover': {
		backgroundColor: "#2cb4ad",
		boxShadow: "none"
	}
})


export default ModulePage