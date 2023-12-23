import type { AddedComment, ChangedComment, DeletedComment } from "@/types";
import axios from "axios";

const COMMENT_URL = import.meta.env.VITE_BACKEND_URL + '/comment';

export const addComment = async (data:AddedComment) => {
    return axios({
        method: "POST",
        url: COMMENT_URL,
        data
    })
}

export const changeComment = async (data:ChangedComment) => {
    return axios({
        method: "PUT",
        url: COMMENT_URL,
        data
    })
}

export const deleteComment = async(data:DeletedComment) => {
    return axios({
        method: "DELETE",
        url: COMMENT_URL,
        data
    })
}

export const getCommentsByPostId = async (postId: number, pageNo: number, pageSize: number) => {
    return axios({
        method: "GET",
        url: COMMENT_URL + `/${postId}`,
        params: { pageNo, pageSize }
    })
}