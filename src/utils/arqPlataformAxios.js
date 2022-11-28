import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const arqPlataformAxios = axios.create({
  baseURL: BASE_URL,
});

/**
 * @param {import("axios").AxiosRequestConfig} param0
 * @returns
 */
export const request = ({ ...options }) => {
//   arqPlataformAxios.defaults.headers.common.Authorization 
//   = `Bearer ${localStorage.getItem(
//     "token"
//   )}`;

  arqPlataformAxios.interceptors.request.use(
    config=>{
        config.headers = {
             ...config.headers,
            'x-token':`${localStorage.getItem(
                "token"
              )}`  }
              return config;
    })

  
  const onSuccess = (response) => response;
  const onError = (error) => error;

  return arqPlataformAxios(options).then(onSuccess).catch(onError);
};
