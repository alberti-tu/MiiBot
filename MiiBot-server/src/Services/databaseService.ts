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

    public async query(sql: string, params: any[] = null): Promise<any> {
        return await new Promise(resolve => resolve( this.querrySQL(sql, params) ));
    }

    private async createDatabase(): Promise<boolean> {
        try {
            // Creating database
            Database.connection = await mariadb.createConnection({ user: configuration.mariaDB.user, host: configuration.mariaDB.host });
            await Database.connection.query('CREATE DATABASE ' + configuration.mariaDB.database);

            // Creating table
            await Database.connection.query('USE ' + configuration.mariaDB.database);
            await Database.connection.query('CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(128) NOT NULL UNIQUE, password VARCHAR(44) NOT NULL)');

            // Creating table
            await Database.connection.query('USE ' + configuration.mariaDB.database);
            await Database.connection.query('CREATE TABLE history (ref INT AUTO_INCREMENT PRIMARY KEY, user BIGINT UNSIGNED NOT NULL, action TEXT NOT NULL, date DATETIME NOT NULL)');

            // Inserting data
            await Database.connection.query('USE ' + configuration.mariaDB.database);
            await Database.connection.query('INSERT INTO users VALUES (DEFAULT,?, ?)', ['admin', 'jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=']);

            // Close connection
            await Database.connection.end();
            Database.connection = null;

            console.log('Database created');
            return await this.connect();
        } 
        catch {
            process.exit(1000);
        }
    }

    private async querrySQL(sql: string, params: any[] = null): Promise<any> {
        Database.connection = await mariadb.createConnection(configuration.mariaDB);
        const result = await Database.connection.query(sql, params);
        await Database.connection.end();

        return result;
    }
}