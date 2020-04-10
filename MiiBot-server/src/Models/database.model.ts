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
    id: number;
    username: string;
    action: string;
    date: Date;
}