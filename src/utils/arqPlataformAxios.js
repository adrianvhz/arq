import axios from "axios"

const BASE_URL = 'http://localhost:8000/api/v1/';
const headers = {}

export const arqPlataformAxios = axios.create({ baseURL: BASE_URL})

export const request = ({...options}) => {
    arqPlataformAxios.defaults.headers.common.Authorization = `Bearer token`
    const onSuccess = (response) => response
    const onError = (error) => error

    return arqPlataformAxios(options).then(onSuccess).catch(onError)
}
