import { Database } from "../Services/databaseService";
import { StatusDatabase, UserDatabase, ActionDatabase } from "../Models/database.model";

const database = new Database();
database.connect();

export async function selectUser(username: string, password: string): Promise<UserDatabase[]> {
    return await database.query('SELECT * FROM users WHERE username = ? AND password = ?', [ username, password ]);
}

export async function insertUser(username: string, password: string): Promise<StatusDatabase> {
    return await database.query('INSERT INTO users VALUES (?,?)', [ username, password ]);
}

export async function deleteUser(username: string): Promise<StatusDatabase> {
    return await database.query('DELETE FROM users WHERE username = ?', [ username ]);
}

export async function selectHistory(page: number, size: number): Promise<ActionDatabase[]> {
    return await database.query('SELECT * FROM history ORDER BY date DESC LIMIT ?', [ page, size ]);
}

export async function insertHistory(username: string, action: string): Promise<StatusDatabase> {
    return await database.query('INSERT INTO history VALUES (?,?,NOW())', [ username, action ]);
}