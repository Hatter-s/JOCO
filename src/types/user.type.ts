export interface User {
    id: number;
    username:string
    avatarAddress: string;
    tagName: string;
}

export interface UserLoginData extends User {
    email:string
}


export interface Login {
    username:string;
    password: string
}

export interface Register extends Login {
    repeatPassword: string;
    email: string;
}