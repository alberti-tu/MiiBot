export interface Response<T> {
    code: number; 
    message: string;
    result: T;
}

export interface Action {
    ref: string;
    action: string;
    user: string;
    date: Date;
}