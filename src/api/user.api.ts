import axios from "axios";
import type { Register, Login, UpdatedHealthInfo, ChangedSelfReaction } from "@/types";


const GET_URL = import.meta.env.VITE_BACKEND_URL + '/user';
const HEALTH_INFO_URL = import.meta.env.VITE_BACKEND_URL + '/health-info';
const REACTION_URL = import.meta.env.VITE_BACKEND_URL + '/reaction';

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

export const updateAvatar = async (userId:number, formData: FormData) => {
    return await axios.post(GET_URL + '/update-avatar', formData, { params: {
        userId
    }});

}

export const getHealthInfo = async (userId:number) => {
    return await axios({
        method: 'GET',
        url: HEALTH_INFO_URL,
        params: { userId },
    })
}

export const updateHealthInfo = async (userId:number,data:UpdatedHealthInfo) => {
    return await axios({
        method: 'POST',
        url: HEALTH_INFO_URL,
        data,
        params: { userId }
    })
}

export const getReactions = async (userId:number) => {
    return await axios({
        method: 'GET',
        url: REACTION_URL + `/${userId}`,
    })
}

export const changeReaction = async(data: ChangedSelfReaction) => {
    const { userId, entityId, reactionId, isLike, isPost } = data
    return axios({
        method: "POST",
        url: REACTION_URL,
        data: {
            userId,
            entityId,
            reactionId,
            isLike,
            isPost
        }
    })
}

export const getAllReaction = async (userId:number) => {
    return await axios({
        method: 'GET',
        url: GET_URL + '/countReaction',
        params: { userId },
    })
}

export const getHealthInfoByWeak = async(userId: number, type: number) => {
    return await axios({
        method: 'GET',
        url: HEALTH_INFO_URL + '/weak',
        params: { userId, type }
    })
}

export const getHealthInfoByMonth = async(userId:number, type: number) => {
    return await axios({
        method: 'GET',
        url: HEALTH_INFO_URL + '/month',
        params: { userId, type }
    })
}