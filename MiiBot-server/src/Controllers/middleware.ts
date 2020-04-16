import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as database from './database';
import { Message } from '../Models/http.model';
import { ActionDatabase } from '../Models/database.model';
import { configuration } from '../config';

export async function login(req: Request<any>, res: Response<Message<string>>, next: NextFunction) {
    try {
        const result = await database.selectUser(req.body.username, req.body.password);
        
        if (result.length === 1) {
            const token = jwt.sign(result[0], configuration.server.secret, { expiresIn: configuration.server.timeout });
            res.status(200).send({ code: 200, message: 'Successful', result: token });
        } else {
            res.status(200).send({ code: 404, message: 'User not found', result: null });
        }
    } catch {
        res.status(400).send({ code: 400, message: 'Bad Request', result: null });
    }
}

export function verifyToken(req: Request<any>, res: Response<Message<string>>, next: NextFunction) {
    try {
        const token = req.headers.authorization;
        res.locals = jwt.verify(token, configuration.server.secret);
        next();
    } catch {
        res.status(401).send({ code: 401, message: 'Unauthorized', result: null });
    }
}

export async function registerUser(req: Request<any>, res: Response<Message<boolean>>, next: NextFunction) {
    try {
        await database.insertUser(req.body.username, req.body.password);
        res.status(201).send({ code: 201, message: 'User created', result: true });
    } catch {
        res.status(400).send({ code: 400, message: 'Bad Request', result: false });
    }
}

export async function deleteUser(req: Request<any>, res: Response<Message<boolean>>, next: NextFunction) {
    try {
        const result = await database.deleteUser(req.query.id);

        if (result.affectedRows === 1) {
            res.status(200).send({ code: 200, message: 'User deleted', result: true });
        } else {
            res.status(200).send({ code: 404, message: 'User not found', result: false });
        }
    } catch {
        res.status(400).send({ code: 400, message: 'Bad Request', result: false });
    }
}

export async function getHistory(req: Request<any>, res: Response<Message<ActionDatabase[]>>, next: NextFunction) {
    try {
        const result = await database.selectHistory(parseInt(req.query.page), parseInt(req.query.size));
        res.status(200).send({ code: 200, message: 'Successful', result: result });
    } catch {
        res.status(400).send({ code: 400, message: 'Bad Request', result: null });
    }
}

export async function insertAction(req: Request<any>, res: Response<Message<boolean>>, next: NextFunction) {
    try {
        await database.insertHistory(req.body.username, req.body.action);
        res.status(201).send({ code: 201, message: 'Action saved', result: true });
    } catch {
        res.status(400).send({ code: 400, message: 'Bad Request', result: false });
    }
}
