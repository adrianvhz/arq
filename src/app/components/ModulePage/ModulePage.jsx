import Card from '@mui/material/Card';
import { useEffect, useState } from 'react';
import GridData from '../GridData/GridData';
import NewProject from '../NewProject/NewProject'
import { useSelector } from 'react-redux';
import { request } from '../../../utils/arqPlataformAxios';
import * as THREE from "three";


const ModulePage = ({ proyecto }) => {
	const [project, setProject] = useState(null)
	const id = useSelector((state) => state.auth.uid);
	const [mutate, setMutate] = useState("init")

	const dataFilterType = (data = '') => {
		const projectExist = data.filter((item) => item.deleted_at !== null)
		setProject(projectExist.filter((item) => item.type_id == proyecto.id))
	}


	const getProjects = async () => {
		const data = await request({ url: `projects/${id}`, method: 'GET' });
		if (data) {
			dataFilterType(data.data.proyectos)
		}
	}

	useEffect(() => {
		getProjects();
	}, [mutate]);

	if (!project) { return <div>Cargando...</div> }

	return (
		<Card sx={{
			width: '100%',
			height: '100%',
		}}>
			<div style={{ margin: "0 2rem" }}>

				{/* CLEAR */}
				<div className="flex" style={{ marginBottom: "1.75rem", marginTop: "2rem" }}>
					<div>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<div>
								<h4>CREAR UN DISEÑO</h4>
								<span>Puedes crear desde cero o escoger una plantilla de proyecto</span>
							</div>
							<div style={{ alignSelf: "end" }}>
								<NewProject mutate={mutate} setMutate={setMutate} />
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
			</div>


			<GridData data={project} typeProject={proyecto} setMutate={setMutate} ></GridData>

		</Card>
	)
}

export default ModulePage