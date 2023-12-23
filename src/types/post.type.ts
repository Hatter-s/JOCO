import type { User, Reaction } from ".";

export interface Post {
    post_id: number;
    poster: User;
    create_time: string;
    title: string;
    content: string
    reaction: Reaction;
    tags: string;
    views: number;
    comments: number;
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