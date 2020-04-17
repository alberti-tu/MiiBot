export interface Response<T> {
    code: number; 
    message: string;
    result: T;
}

export interface Action {
    ref: string;
    user: string;
    action: string;
    date: Date;
}