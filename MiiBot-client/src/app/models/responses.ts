export interface Response<T> {
    code: number; 
    message: string;
    result: T;
}

export interface User {
    id: string;
    username: string;
}

export interface Action {
    ref: string;
    user: string;
    action: string;
    date: Date;
}