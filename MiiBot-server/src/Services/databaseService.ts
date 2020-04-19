import mariadb from 'mariadb';
import { configuration } from '../config';

export class Database {

    constructor() {
        this.checkDatabase();
    }

    public query(sql: string, params: any[] = null): Promise<any> {
        return new Promise(async resolve => {
            const connection = await mariadb.createConnection(configuration.mariaDB);
            const result = await connection.query(sql, params);
            await connection.end();
    
            resolve(result);
        });
    }

    private async checkDatabase() {
        try {
            const connection = await mariadb.createConnection(configuration.mariaDB);
            await connection.end();

            console.log('Database connected');
        } catch {
            await this.createDatabase();
        }
    }

    private async createDatabase() {
        try {
            const connection = await mariadb.createConnection({ user: configuration.mariaDB.user, host: configuration.mariaDB.host });
            
            // Creating database
            await connection.query('CREATE DATABASE ' + configuration.mariaDB.database);
            await connection.query('USE ' + configuration.mariaDB.database);
            await connection.query('CREATE TABLE users (id VARCHAR(64) NOT NULL UNIQUE, username VARCHAR(128) PRIMARY KEY, password VARCHAR(64) NOT NULL)');
            await connection.query('CREATE TABLE history (ref VARCHAR(64) PRIMARY KEY, user VARCHAR(128), action TEXT NOT NULL, date TIMESTAMP NOT NULL, CONSTRAINT `fk_user` FOREIGN KEY (user) REFERENCES users (username))');

            // Inserting data
            await connection.query('INSERT INTO users VALUES (?,?,?)', ['1', 'alberti_tu', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918']);

            await connection.end();

            console.log('Database created');

            this.checkDatabase();
        } catch {
            const connection = await mariadb.createConnection({ user: configuration.mariaDB.user, host: configuration.mariaDB.host });
            await connection.query('DROP DATABASE ' + configuration.mariaDB.database);
            await connection.end();

            console.log('Drop database ' + configuration.mariaDB.database);

            process.exit(1000);
        }
    }
}
