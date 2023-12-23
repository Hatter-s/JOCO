import type { User, Reaction } from ".";

export interface Comment {
    postId: number;
    commentId: number;
    userId: User;
    content: string;
    parentId: number| null;
    reaction: Reaction;
}

export interface CommentParam {
    postId: number;
    commentId: number;
    userId: User;
    content: string;
    parentId: number| null;
}

export interface AddedComment extends CommentParam {

};

export interface ChangedComment extends CommentParam {

}

export interface DeletedComment extends CommentParam {

}
