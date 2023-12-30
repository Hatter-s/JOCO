import axios from "axios";
import type { EditedPost, DeletedPost, AddedPost } from "@/types";

const POST_URL = import.meta.env.VITE_BACKEND_URL + '/post';
const UPLOAD_URL = import.meta.env.VITE_BACKEND_URL +'/upload';

//pageNo start at 0
export const getListPost = async (pageNo:number, pageSize:number) => {                                      
    return await axios({
        method: 'GET',
        url: POST_URL,
        params: {pageNo, pageSize}
    })
}

export const editPost = async (data:EditedPost) => {
    return await axios({
        method: 'PUT',
        url: POST_URL,
        data
    })
}

export const deletePost = async (data:DeletedPost) => {
    return await axios({
        method: 'DELETE',
        url: POST_URL,
        data
    })
}

export const getPostByPostId = async (postId:number) => {
    return axios({
        method: 'GET',
        url: POST_URL + `/${postId}`,
    })
}

export const getPostsByUserId = async (userId: number, pageNo: number, pageSize: number) => {
    return await axios({
        method: 'GET',
        url: POST_URL + `/user/${userId}`,
        params: { pageNo, pageSize}
    })
}

export const getPostsByTagId = async (tagId: number, pageNo: number, pageSize: number) => {
    return await axios({
        method: 'GET',
        url: POST_URL + `tag/${tagId}`,
        params: {pageNo, pageSize}
    })
}

export const addPost = async (data: AddedPost) => {
    return await axios({
        method: 'POST',
        url: POST_URL,
        data
    }) 
}

export const searchPost = async (keyword: string, pageNo: number, pageSize: number) => {
    return await axios({
        method: 'GET',
        url: POST_URL + '/search',
        params: { keyword, pageNo, pageSize }
    })
}

export const uploadFile = async (formData: FormData) => {
    return await axios.post(UPLOAD_URL, formData);
}

export const getFileURL = async (path: string) => {
    return await axios({
        method: 'GET',
        url: UPLOAD_URL + '/display' + `/${path}`,
    }).then(res => res);
}

export const increaseLookTime = async (postId: number) => {
    return await axios({
        method: 'POST',
        url: POST_URL + '/increase-look-time',
        params: {postId}
    })

}
