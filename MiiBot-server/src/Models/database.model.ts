export interface StatusDatabase {
    affectedRows: number; 
    insertId: number;
    warningStatus: number;
}

export interface UserDatabase {
    id: number;
    username: string;
    password: string;
}

export interface ActionDatabase {
    ref: number;
    user: string;
    action: string;
    date: Date;
}