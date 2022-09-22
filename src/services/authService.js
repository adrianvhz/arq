import { request, arqPlataformAxios} from "../utils/arqPlataformAxios";
import axios from "axios"


export const login = async (email,password) => {
	return await request({ url: 'auth/login', method: 'POST', data: { email, password } });
		
}

export const register = async (name, lastname, email, password) => {
	return await request({ url: "auth/register", method: "POST", data: { name, lastname, email, password } });
}

export const isCheckTokenService = async (token) => {
	return await request({ url: 'auth/renew', method: 'GET', data: { token } });
		
}


