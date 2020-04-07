import { Database } from "../Services/databaseService";
import { StatusDatabase, UserDatabase, ActionDatabase } from "../Models/database.model";

const database = new Database();
database.connect();

export async function selectUser(username: string, password: string): Promise<UserDatabase[]> {
    return await database.query('SELECT * FROM users WHERE username = ? AND password = ?', [ username, password ]);
}

export async function insertUser(username: string, password: string): Promise<StatusDatabase> {
    return await database.query('INSERT INTO users VALUES (DEFAULT,?, ?)', [ username, password ]);
}

export async function deleteUser(id: number): Promise<StatusDatabase> {
    return await database.query('DELETE FROM users WHERE id = ?', [ id ]);
}

export async function selectHistory(page: number, size: number): Promise<ActionDatabase[]> {
    return await database.query('SELECT id, username, action, date FROM users, history ORDER BY date DESC LIMIT ? OFFSET ?', [ size, page ]);
}

export async function insertHistory(id: number, action: string): Promise<StatusDatabase> {
    return await database.query('INSERT INTO history VALUES (DEFAULT,?,?,NOW())', [ id, action ]);
}