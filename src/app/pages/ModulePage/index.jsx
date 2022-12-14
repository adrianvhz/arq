import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import GridData from "../../components/GridData/GridData";
import NewProject from "../../components/NewProject/NewProject";
import { getProjectsByUserID } from '../../../services/projectsService';

export const ModulePage = ({ proyecto }) => {
	const projects__ = useSelector(state => state.project.projects);
	// console.log(projects__)
	// const [projects, setProjects] = useState(null);
	const [projects, setProjects] = useState(projects__);

	const [mutate, setMutate] = useState("init");
	const { slug } = useParams();
	const id = useSelector((state) => state.auth.uid);

	const getProjects = async () => {
		const data = await getProjectsByUserID(id, slug);
		if (data) {
			console.log(data)
			setProjects(data.data.proyectos);
		}
	}
	
	useEffect(() => {
		if (!projects__) {
			getProjects();
		}
	}, [mutate]);

	return (
		<Card sx={{
			width: '100%',
			height: '100%',
		}}>
			<div style={{ margin: "0 2rem" }}>
				{/* CLEAR */}
				<div style={{ marginBottom: "1.75rem", marginTop: "2rem" }}>
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

			<GridData projects={projects__} typeProject={proyecto} setMutate={setMutate}></GridData>
		</Card>
	)
}
