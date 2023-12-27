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
export interface HealthInfo {
    height: number;
    weight: number;
    sleepTime: number;
    trainingTime: number;
    BMI: number;
}

export interface UpdatedHealthInfo {
    height: number;
    weight: number;
    sleepTime: number;
    trainingTime: number;
}

