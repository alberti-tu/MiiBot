import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import * as database from './database';
import { Message } from '../Models/http.model';
import { ActionDatabase } from '../Models/database.model';
import { configuration } from '../config';

export async function login(req: Request<any>, res: Response<Message<string>>, next: NextFunction) {
    try {
        const result = await database.selectUser(req.body.username, req.body.password);
        
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

export async function registerUser(req: Request<any>, res: Response<Message<boolean>>, next: NextFunction) {
    try {
        const hash = crypto.createHash('sha256').update(req.body.password).digest('base64');
        const result = await database.insertUser(req.body.username, hash);
        
        if (result.affectedRows === 1) {
            res.send({ code: 201, message: 'User created', result: true });
        } else {
            res.send({ code: 404, message: 'User not saved', result: false });
        }
    } catch {
        res.send({ code: 400, message: 'Error', result: false });
    }
}

export async function deleteUser(req: Request<any>, res: Response<Message<boolean>>, next: NextFunction) {
    try {
        const result = await database.deleteUser(req.query.id);

        if (result.affectedRows === 1) {
            res.send({ code: 200, message: 'User deleted', result: true });
        } else {
            res.send({ code: 404, message: 'User not found', result: false });
        }
    } catch {
        res.send({ code: 400, message: 'Error', result: false });
    }
}

export async function getHistory(req: Request<any>, res: Response<Message<ActionDatabase[]>>, next: NextFunction) {
    try {
        const result = await database.selectHistory(parseInt(req.query.page), parseInt(req.query.size));
        res.send({ code: 200, message: 'Successful', result: result });
    } catch {
        res.send({ code: 400, message: 'Error', result: null });
    }
}

export async function insertAction(req: Request<any>, res: Response<Message<boolean>>, next: NextFunction) {
    try {
        const result = await database.insertHistory(req.body.id, req.body.action);

        if (result.affectedRows === 1) {
            res.send({ code: 201, message: 'Action saved', result: true });
        } else {
            res.send({ code: 404, message: 'Action not saved', result: false });
        } 
    } catch {
        res.send({ code: 400, message: 'Error', result: false });
    }
}
