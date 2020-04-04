import { MiiBot } from './Controllers/bot';
import express from 'express';

const bot = new MiiBot();
const app = express();

app.listen(3000, () => console.log('Server is listening on http://[...]:3000'));

app.get('/', (req, res) => res.send('Hello world!'));