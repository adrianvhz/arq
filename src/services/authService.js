import { request,arqPlataformAxios} from "../utils/arqPlataformAxios";
import axios from "axios"


export const login = async (email,password) => {
    console.log({email,password})
    return await request({url:'auth/login', method:'post', data:{email,password}})
}