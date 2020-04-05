import mariadb, { Connection } from 'mariadb';
import { configuration } from '../config';

export class Database {

    private static connection: Connection = null;
    
    constructor() { }

    public async connect(): Promise<boolean> {
        try {
            Database.connection = await mariadb.createConnection(configuration.mariaDB);
            await Database.connection.end();
            Database.connection = null;

            console.log('Database connected');
            
            return true;
        } catch {
            return await this.createDatabase();
        }
    }

    public async query(sql, params = null): Promise<any[]> {
        return await new Promise(resolve => resolve( this.querrySQL(sql, params) ));
    }

    private async createDatabase(): Promise<boolean> {
        try {
            // Creating database
            Database.connection = await mariadb.createConnection({ user: configuration.mariaDB.user, host: configuration.mariaDB.host });
            await Database.connection.query('CREATE DATABASE ' + configuration.mariaDB.database);

            // Creating table
            await Database.connection.query('USE ' + configuration.mariaDB.database);
            await Database.connection.query('CREATE TABLE users (username VARCHAR(64) NOT NULL, password VARCHAR(64) NOT NULL, UNIQUE KEY unique_user (username))');

            // Inserting data
            await Database.connection.query('USE ' + configuration.mariaDB.database);
            await Database.connection.query('INSERT INTO users VALUES (?, ?)', ['admin', 'admin']);

            await Database.connection.query('USE ' + configuration.mariaDB.database);
            await Database.connection.query('INSERT INTO users VALUES (?, ?)', ['test', 'test']);

            await Database.connection.end();
            Database.connection = null;

            console.log('Database created');
            return await this.connect();
        } 
        catch {
            process.exit(1000);
        }
    }

    private async querrySQL(sql, params): Promise<any[]> {
        Database.connection = await mariadb.createConnection(configuration.mariaDB);
        const result = await Database.connection.query(sql, params);
        await Database.connection.end();

        return result;
    }
}