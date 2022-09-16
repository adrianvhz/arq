
import { request} from "../utils/arqPlataformAxios";


export const getShowPlanUserByIdService = async (id) => {
	return await request({ url: 'plan/show', method: 'POST', data: { iduser:id, estado: 1 } })
		
}

export const updatePersonalDataService = async ({uid,name,lastname,email,password,flag}) => {
	return await request({ url: `usuario/update/${uid}`, method: 'PUT', data: { name,lastname,email,password,flag } })
		
}


