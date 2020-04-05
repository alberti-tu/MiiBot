import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
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
        res.send({ code: 400, message: 'Query error', result: null });
    }
}

export function verifyToken(req: Request<any>, res: Response<Message<string>>, next: NextFunction) {
    try {
        const token = req.headers.authorization;
        jwt.verify(token, configuration.server.secret);
        next();
    }
    catch {
        res.send({ code: 401, message: 'Unauthorized', result: null });
    }
}

export function test(req: Request<any>, res: Response<Message<string>>, next: NextFunction) {
    res.send({ code: 200, message: 'Successful', result: 'ok' });
}