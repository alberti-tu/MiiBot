import crypto from 'crypto';
import { Database } from '../Services/databaseService';
import { StatusDatabase, UserDatabase } from '../Models/database.model';

const database = new Database();
database.connect();

export async function selectUser(username: string, password: string): Promise<UserDatabase[]> {
    return await database.query('SELECT id, username FROM users WHERE username = ? AND password = ?', [ username, password ]);
}

export async function existsUser(username: string): Promise<boolean> {
    const result = await database.query('SELECT * FROM users WHERE username = ?', [ username ]);
    return result.length === 1 ? true : false;
}

export async function insertUser(username: string, password: string): Promise<StatusDatabase> {
    const idHash = crypto.createHash('sha256').update(new Date().getTime().toString()).digest('hex');
    const passwordHash = crypto.createHash('sha256').update(password).digest('hex');
    return await database.query('INSERT INTO users VALUES (?,?,?)', [ idHash, username, passwordHash ]);
}

export async function deleteUser(id: number): Promise<StatusDatabase> {
    return await database.query('DELETE FROM users WHERE id = ?', [ id ]);
}

export async function selectHistory(page: number, size: number): Promise<any[]> {
    return await database.query('SELECT * FROM history ORDER BY date DESC LIMIT ? OFFSET ?', [ size, page ]);
}

export async function insertHistory(username: string, action: string): Promise<StatusDatabase> {
    const ref = crypto.createHash('sha256').update(new Date().getTime().toString()).digest('hex');
    return await database.query('INSERT INTO history VALUES (?,?,?,NOW())', [ ref, username, action ]);
}