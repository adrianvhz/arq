import { setProjects } from "./mainSlice";
import { getProjects } from "../../services/projectsService"

export const startFetchProjects = () => {
	return async (dispatch) => {
		var projects = (await getProjects()).data;
		dispatch(setProjects({ projects: projects }));
	}
}
