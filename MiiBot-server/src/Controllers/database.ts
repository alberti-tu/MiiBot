import crypto from 'crypto';
import readline from 'readline';
import { Database } from '../Services/databaseService';
import { StatusDatabase, UserDatabase } from '../Models/database.model';

const database = new Database();
database.checkDatabase().then(result => {
    if (result) {
        console.log('Database connected');
    } else {
        const read = readline.createInterface({ input: process.stdin, output: process.stdout });
        
        console.log('\n+----- REGISTER ADMIN USER -----+\n');
        read.question('Username: ', async username => {
            read.question('Password: ', async password => {
                console.log('\n+--------------------------------+\n');

                const result = await insertUserAdmin(username, password);
                
                if (result.affectedRows === 1) {
                    console.log('User added to database');
                } else {
                    console.log('Error: User not added');
                }
                
                read.close();
            });
        });
    }
});

// Telegram user's functions

export async function selectUser(username: string): Promise<boolean> {
    const result = await database.query('SELECT * FROM users WHERE username = ?', [ username ]);
    return result.length === 1 ? true : false;
}

export async function insertUser(username: string): Promise<StatusDatabase> {
    const idHash = crypto.createHash('sha256').update(new Date().getTime().toString()).digest('hex');
    return await database.query('INSERT INTO users VALUES (?,?)', [ idHash, username ]);
}

export async function deleteUser(id: number): Promise<StatusDatabase> {
    return await database.query('DELETE FROM users WHERE id = ?', [ id ]);
}

// Admin's functions

export async function selectUserAdmin(username: string, password: string): Promise<UserDatabase[]> {
    return await database.query('SELECT id, username FROM admins WHERE username = ? AND password = ?', [ username, password ]);
}

export async function insertUserAdmin(username: string, password: string): Promise<StatusDatabase> {
    const idHash = crypto.createHash('sha256').update(new Date().getTime().toString()).digest('hex');
    const passwordHash = crypto.createHash('sha256').update(password).digest('hex');
    return await database.query('INSERT INTO admins VALUES (?,?,?)', [ idHash, username, passwordHash ]);
}

export async function deleteUserAdmin(id: number): Promise<StatusDatabase> {
    return await database.query('DELETE FROM admins WHERE id = ?', [ id ]);
}

// Action's functions

export async function selectHistoryCount(): Promise<any> {
    return await database.query('SELECT COUNT(*) FROM history');
}

export async function selectHistory(page: number, size: number): Promise<any[]> {
    return await database.query('SELECT * FROM history ORDER BY date DESC LIMIT ? OFFSET ?', [ size, page ]);
}

export async function insertHistory(username: string, action: string): Promise<StatusDatabase> {
    const ref = crypto.createHash('sha256').update(new Date().getTime().toString()).digest('hex');
    return await database.query('INSERT INTO history VALUES (?,?,?,NOW())', [ ref, username, action ]);
}
