import express from 'express';
import { MiiBot } from './Controllers/bot';
import { configuration } from './configuration';

const app = express();
new MiiBot();

app.listen(configuration.server.token, () => {
    console.log('Server is listening on http://[...]:' + configuration.server.token);
});

app.get('/', (req, res) => res.send('Hello world!'));