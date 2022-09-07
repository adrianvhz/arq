import { request, arqPlataformAxios} from "../utils/arqPlataformAxios";
import axios from "axios"


export const login = (email,password) => {
	return request({ url: 'auth/login', method: 'POST', data: { email, password } })
		.then(res => res)
		.catch(err => err)
}

export const register = (name, lastname, email, password) => {
	return request({ url: "auth/register", method: "POST", data: { name, lastname, email, password } })
		.then(res => res)
		.catch(err => err)
}
