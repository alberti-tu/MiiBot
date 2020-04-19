import mariadb from 'mariadb';
import { configuration } from '../config';

export class Database {

    constructor() { }

    public async checkDatabase(): Promise<boolean> {
        try {
            const connection = await mariadb.createConnection(configuration.mariaDB);
            await connection.end();
            return true;
        } catch {
            await this.createDatabase();
            return false;
        }
    }

    public query(sql: string, params: any[] = null): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const connection = await mariadb.createConnection(configuration.mariaDB);
                const result = await connection.query(sql, params);
                await connection.end();
    
                resolve(result);
            } catch {
                reject(new Error('Database error'));
            }
        });
    }

    private async createDatabase(): Promise<void> {
        try {
            const connection = await mariadb.createConnection({ user: configuration.mariaDB.user, host: configuration.mariaDB.host });
            
            // Creating database
            await connection.query('CREATE DATABASE ' + configuration.mariaDB.database);
            await connection.query('USE ' + configuration.mariaDB.database);
            await connection.query('CREATE TABLE users (id VARCHAR(64) NOT NULL UNIQUE, username VARCHAR(128) PRIMARY KEY)');
            await connection.query('CREATE TABLE admins (id VARCHAR(64) NOT NULL UNIQUE, username VARCHAR(128) PRIMARY KEY, password VARCHAR(64) NOT NULL)');
            await connection.query('CREATE TABLE history (ref VARCHAR(64) PRIMARY KEY, user VARCHAR(128), action TEXT NOT NULL, date TIMESTAMP NOT NULL, CONSTRAINT `fk_user` FOREIGN KEY (user) REFERENCES users (username))');

            await connection.end();

            console.log('Database created');
        } catch {
            const connection = await mariadb.createConnection({ user: configuration.mariaDB.user, host: configuration.mariaDB.host });
            await connection.query('DROP DATABASE ' + configuration.mariaDB.database);
            await connection.end();

            console.log('Drop database ' + configuration.mariaDB.database);

            process.exit(1000);
        }
    }
}
