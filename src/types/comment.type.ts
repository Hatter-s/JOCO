import type { User, Reaction } from ".";

export interface Comment {
    id: number;
    reactionId:number;
    userDTO: User;
    parentId: number| null;
    content: string;
    reactionDTO: Reaction;
    createTime: string;
    postId: number;
}

export interface CommentParam {
    postId: number;
    id: number;
    userId: number;
    content: string;
    parentId: number| null;
}

export interface AddedComment {
    id: null;
    postId: number;
    userId: number;
    parentId: number| null;
    content: string;
};

export interface ChangedComment extends CommentParam {
}

export interface DeletedComment extends CommentParam {
}
