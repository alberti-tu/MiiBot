import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as database from './database';
import { Message } from '../Models/http.model';
import { ActionDatabase } from '../Models/database.model';
import { configuration } from '../config';

export async function login(req: Request<any>, res: Response<Message<string>>, next: NextFunction) {
    try {
        const result = await database.selectUserAdmin(req.body.username, req.body.password);
        
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

export async function verifyToken(req: Request<any>, res: Response<Message<string>>, next: NextFunction) {
    try {
        const token: { id: string, iat: number, exp: number } = JSON.parse(JSON.stringify(jwt.verify(req.headers.authorization, configuration.server.secret)));
        const result = await database.verifyAdmin(token.id);

        if (result) {
            res.locals = { ...res.locals, id: token.id };
            next();
        } else {
            res.status(401).send({ code: 401, message: 'Unauthorized', result: null });
        }
    } catch {
        res.status(401).send({ code: 401, message: 'Unauthorized', result: null });
    }
}

export async function getUserCount(req: Request<any>, res: Response<Message<number>>, next: NextFunction) {
    try {
        const result = await database.selectUserCount();
        res.status(200).send({ code: 200, message: 'Successful', result: result });
    } catch {
        res.status(400).send({ code: 400, message: 'Bad Request', result: null });
    }
}

export async function getUserList(req: Request<any>, res: Response<Message<any[]>>, next: NextFunction) {
    try {
        const result = await database.selectUserList(parseInt(req.query.page), parseInt(req.query.size));
        res.status(200).send({ code: 200, message: 'Successful', result: result });
    } catch {
        res.status(400).send({ code: 400, message: 'Bad Request', result: null });
    }
}

export async function registerUser(req: Request<any>, res: Response<Message<boolean>>, next: NextFunction) {
    try {
        await database.insertUser(req.body.username);
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

export async function registerAdmin(req: Request<any>, res: Response<Message<boolean>>, next: NextFunction) {
    try {
        await database.insertUserAdmin(req.body.username, req.body.password);
        res.status(201).send({ code: 201, message: 'User created', result: true });
    } catch {
        res.status(400).send({ code: 400, message: 'Bad Request', result: false });
    }
}

export async function deleteAdmin(req: Request<any>, res: Response<Message<boolean>>, next: NextFunction) {
    try {
        const result = await database.deleteUserAdmin(req.query.id);

        if (result.affectedRows === 1) {
            res.status(200).send({ code: 200, message: 'User deleted', result: true });
        } else {
            res.status(200).send({ code: 404, message: 'User not found', result: false });
        }
    } catch {
        res.status(400).send({ code: 400, message: 'Bad Request', result: false });
    }
}

export async function getHistoryCount(req: Request<any>, res: Response<Message<number>>, next: NextFunction) {
    try {
        const result = await database.selectHistoryCount();
        res.status(200).send({ code: 200, message: 'Successful', result: result });
    } catch {
        res.status(400).send({ code: 400, message: 'Bad Request', result: null });
    }
}

export async function getHistoryList(req: Request<any>, res: Response<Message<ActionDatabase[]>>, next: NextFunction) {
    try {
        const result = await database.selectHistoryList(parseInt(req.query.page), parseInt(req.query.size));
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
