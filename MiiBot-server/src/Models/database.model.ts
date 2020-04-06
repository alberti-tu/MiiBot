export interface StatusDatabase {
    affectedRows: number; 
    insertId: number;
    warningStatus: number;
}

export interface UserDatabase {
    username: string;
    password: string;
}

export interface ActionDatabase {
    username: string;
    action: string;
    date: Date;
}