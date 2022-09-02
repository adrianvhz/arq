import axios from "axios"

const BASE_URL = 'http://localhost:8000/api/v1/';

export const arqPlataformAxios = axios.create({
	baseURL: BASE_URL
});

/**
 * @param {import("axios").AxiosRequestConfig} param0
 * @returns 
 */
export const request = ({...options}) => {
    arqPlataformAxios.defaults.headers.common.Authorization = `Bearer token`
    const onSuccess = (response) => response
    const onError = (error) => error

    return arqPlataformAxios(options).then(onSuccess).catch(onError)
}
