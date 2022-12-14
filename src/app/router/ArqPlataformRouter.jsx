import { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppLayout } from "../layout/AppLayout";
import { setProjects, setTypeProjects } from "../../redux/projects/projectSlice";
import { getProjectsByUserID, getTypeProjects } from "../../services/projectsService";
import {
	Home,
	ModulePage,
	SistemaPage,
	PerfilPage,
	VersionsPage,
	CostsPage
} from "../pages";

export const ArqPlataformRouter = () => {
	const id = useSelector((state) => state.auth.uid);
	const dispatch = useDispatch();
	
	const getData = async () => {
		const projects = await getProjectsByUserID(id);
		const typeProjects = await getTypeProjects();

		dispatch(setProjects({ projects: projects.data.proyectos }));
		dispatch(setTypeProjects({ typeProjects: typeProjects.data }));
	}
	
	useEffect(() => {
		getData();
	}, []);

	return (
		<AppLayout>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/perfil" element={<PerfilPage />} />
				<Route path="/proyecto/:slug" element={<ModulePage />} />
				<Route path="/proyecto/:slug/:id/versions" element={<VersionsPage />} />
				<Route path="/proyecto/:slug/:id/costs" element={<CostsPage />} />
				<Route path="/sistema" element={<SistemaPage /> } />
				<Route path="/*" element={<Navigate to="/" />} />
			</Routes>
		</AppLayout>
	)
}
