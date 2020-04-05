import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { Database } from './database';
import { Message } from '../Models/interfaces';
import { configuration } from '../config';

const mysql = new Database();
mysql.connect();

export async function login(req: Request<any>, res: Response<Message<string>>, next: NextFunction) {
    try {
        const result = await mysql.query('SELECT * FROM users WHERE username = ? AND password = ?', [req.body.username, req.body.password]);
        
        if (result.length === 1) {
            const token = jwt.sign({ username: result[0].username }, configuration.server.secret, { expiresIn: configuration.server.timeout });
            res.send({ code: 200, message: 'Successful', result: token });
        } else {
            res.send({ code: 205, message: 'User not found', result: null });
        }
    }
    catch {
        res.send({ code: 400, message: 'Error', result: null });
    }
}

export async function registerUser(req: Request<any>, res: Response<Message<boolean>>, next: NextFunction) {
    try {
        const hash = crypto.createHash('sha256').update(req.body.password).digest('base64');
        await mysql.query('INSERT INTO users VALUES (?,?)', [req.body.username, hash]);
        res.send({ code: 201, message: 'User created', result: true });
    } catch {
        res.send({ code: 400, message: 'Error', result: false });
    }
}

export async function deleteUser(req: Request<any>, res: Response<Message<boolean>>, next: NextFunction) {
    try {
        await mysql.query('DELETE FROM users WHERE username = ?', [req.body.username]);
        res.send({ code: 200, message: 'User deleted', result: true });
    } catch {
        res.send({ code: 400, message: 'Error', result: false });
    }
}

export function verifyToken(req: Request<any>, res: Response<Message<string>>, next: NextFunction) {
    try {
        const token = req.headers.authorization;
        res.locals = jwt.verify(token, configuration.server.secret);
        next();
    }
    catch {
        res.send({ code: 401, message: 'Unauthorized', result: null });
    }
}
