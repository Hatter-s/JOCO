import type { User, Reaction } from ".";

export interface Post {
    postId: number;
    poster: User;
    createTime: string;
    title: string;
    content: string
    reaction: Reaction;
    tags: any;
    watchTime: number;
    countComment: number;
    reactionId: number
}

export interface AddedPost {
    userId: number;
    userName: string;
    tags: string;
    title: string;
    content: string;

}

export interface EditedPost {
    userId: number;
    postId: number;
    newContent: string;
    newTitle: string;
}

export interface DeletedPost {
    userId: number;
    postId: number;
}