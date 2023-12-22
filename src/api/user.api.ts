import axios from "axios";
import type { Register, Login } from "@/types";


const GET_URL = import.meta.env.VITE_BACKEND_URL + '/user';

export const register = async (data :Register) => {
    return await axios({
        method: 'post',
        url: GET_URL + '/register',
        data
    }).catch(err => console.error(err)) 
}

export const login = async (username:string, password: string) => {
    const data:Login = {
        username,
        password
    }

    return await axios({
        method: 'post',
        url: GET_URL + '/login',
        data
    }).catch(err => console.error(err))
}   