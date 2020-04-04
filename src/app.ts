import express from 'express';
import path from 'path';
import { MiiBot } from './Controllers/bot';
import { configuration } from './config';

const bot = new MiiBot();

const app = express();

app.listen(configuration.server.token, () => {
    console.log('Server is listening on http://[...]:' + configuration.server.token);
});

app.get('/', (req, res) => res.send('Hello world!'));

// Frontend routes
const allowedExt = ['.js', '.ico', '.css', '.png', '.jpg', '.woff2', '.woff', '.ttf', '.svg'];
app.get('*', (req, res) => {
    if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) res.sendFile(path.resolve('public/' + req.url));
    else res.sendFile(path.resolve('public/index.html'));
});