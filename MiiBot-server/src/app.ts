import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import * as server from './Controllers/middleware';
import { MiiBot } from './Controllers/bot';
import { configuration } from './config';

new MiiBot();
const app = express();

app.listen(configuration.server.port, () => {
    console.log('Server is listening on http://[...]:' + configuration.server.port);
});

app.use(bodyParser.json());

// Backend routes
app.post('/api/user/login', server.login);
app.post('/api/user/register', server.registerUser);
app.post('/api/user/delete', server.verifyToken, server.deleteUser);

// Frontend routes
const allowedExt = ['.js', '.ico', '.css', '.png', '.jpg', '.woff2', '.woff', '.ttf', '.svg'];
app.get('*', (req, res) => {
    if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) res.sendFile(path.resolve('public/' + req.url));
    else res.sendFile(path.resolve('public/index.html'));
});