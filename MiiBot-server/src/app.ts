import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import * as server from './Controllers/middleware';
import { MiiBot } from './Controllers/bot';
import { configuration } from './config';

new MiiBot();
const app = express();

app.listen(configuration.server.port, () => {
    console.log('Server is listening on http://[...]:' + configuration.server.port);
});

app.use(cors());
app.use(bodyParser.json());

// Backend routes
app.post('/api/login', server.login);

app.post('/api/user', server.verifyToken, server.registerUser);
app.delete('/api/user', server.verifyToken, server.deleteUser);

app.get('/api/action/count', server.verifyToken,server.getHistoryCount);
app.get('/api/action', server.verifyToken,server.getHistory);
app.post('/api/action', server.verifyToken, server.insertAction);

// Frontend routes
const allowedExt = ['.js', '.ico', '.css', '.png', '.jpg', '.woff2', '.woff', '.ttf', '.svg'];
app.get('*', (req, res) => {
    if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) res.sendFile(path.resolve('public/' + req.url));
    else res.sendFile(path.resolve('public/index.html'));
});