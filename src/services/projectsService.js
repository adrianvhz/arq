import { request } from "../utils/arqPlataformAxios"

export const getProjectByID = (id) => {
	return request({ method: "GET", url: `projects/id/${id}` })
}

export const getProjectsByUserID = (id, type_project) => {
	return request({
		method: "GET",
		url: `projects/${id}`,
		params: {
			"type_project": type_project
		}
	});
}

export const getProjectVersionsByID = (id) => {
	return request({ method: "GET", url: `projects/versions/${id}` });
}

export const getProjects = () => {
	return request({ method: "GET", url: "projects" })
		.then(res => res)
		.catch(err => err)
}

export const deleteProjects = (id) => {
	return request({ method: "DELETE", url: `projects/${id}` })
		.then(res => res)
		.catch(err => err)
}

export const getTypeProjects = () => {
	return request({ method: "GET", url: "typeProject" })
		.then(res => res)
		.catch(err => err)
}