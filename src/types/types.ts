export interface Reaction {
    like: number;
    dislike: number;
    total: number;
}

export interface User {
    user_id: number;
    ava_img: string;
    tag_name: string;
}

export interface Post {
    post_id: number;
    poster: User;
    create_time: string;
    title: string;
    content: string
    reaction: Reaction;
    tags: string[];
    views: number;
    comments: number;
}

export interface SubComment {
    commenter: User;
    content: string;
    parent_id: number;
    create_time: string;
}

export interface Comment {
    post_id: number;
    comment_id: number;
    commenter: User;
    content: string;
    reaction: Reaction;
    sub_comments: SubComment[] | [];
    parent_id: number| null;
    create_time: string;
}