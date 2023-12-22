export interface User {
    user_id: string;
    ava_img: string;
    tag_name: string;
}

export interface Login {
    username:string;
    password: string
}

export interface Register extends Login {
    repeatPassword: string;
    email: string;
}