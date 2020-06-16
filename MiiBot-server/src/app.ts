import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import helmet from 'helmet';
import * as server from './Controllers/middleware';
import { MiiBot } from './Controllers/bot';
import { configuration } from './config';

new MiiBot();
const app = express();

app.listen(configuration.server.port, () => {
    console.log('Server is listening on http://[...]:' + configuration.server.port);
});

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

// Backend routes
app.post('/api/login', server.login);

app.get('/api/user', server.verifyToken, server.getUserList);
app.post('/api/user', server.verifyToken, server.registerUser);
app.delete('/api/user', server.verifyToken, server.deleteUser);
app.get('/api/user/count', server.verifyToken, server.getUserCount);

app.post('/api/admin', server.verifyToken, server.registerAdmin);
app.delete('/api/admin', server.verifyToken, server.deleteAdmin);

app.get('/api/action', server.verifyToken,server.getHistoryList);
app.post('/api/action', server.verifyToken, server.insertAction);
app.get('/api/action/count', server.verifyToken, server.getHistoryCount);

// Frontend routes
const allowedExt = ['.js', '.ico', '.css', '.png', '.jpg', '.woff2', '.woff', '.ttf', '.svg'];
app.get('*', (req, res) => {
    if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) res.sendFile(path.resolve('public/' + req.url));
    else res.sendFile(path.resolve('public/index.html'));
});