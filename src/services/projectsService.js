import { request } from "../utils/arqPlataformAxios"

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
