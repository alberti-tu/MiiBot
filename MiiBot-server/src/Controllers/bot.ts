import Telegraf, { ContextMessageUpdate } from 'telegraf';
import axios from 'axios';
import * as translateService from '../Services/translateService';
import { IntentMessage } from '../Models/http.model';
import { actions } from '../Services/actionService';
import { configuration } from '../config';

export class MiiBot {
    private bot: Telegraf<ContextMessageUpdate> = null;

    constructor() {
        this.bot = new Telegraf(configuration.bot.token);

        this.bot.start(event => this.welcomeMessage(event));
        this.bot.help(event => this.helpMessage(event));
        this.bot.on('text', event => this.messageResponse(event));
        this.bot.on('sticker', event => event.reply('👍'));
        
        this.bot.launch();
    }

    private async welcomeMessage(event: ContextMessageUpdate) {
        const message = 'Encantado de ayudarte ' + event.update.message.from.first_name + '!';
        const server = await translateService.serverMessage(message, event.update.message.from.language_code);
        event.reply(server.target.message);
    }

    private async helpMessage(event: ContextMessageUpdate) {
        const message = 'Enviame un sticker';
        const server = await translateService.serverMessage(message, event.update.message.from.language_code);
        event.reply(server.target.message);
    }

    private async messageResponse(event: ContextMessageUpdate) {
        try {
            const user = await translateService.userMessage(event.update.message.text);

            const response = await axios.get<IntentMessage>(configuration.bot.url + user.target.message);
            let result = response.data.prediction.topIntent;
    
            const action = actions.find(item => item.name === result);
            const message = action !== undefined ? await action.function(event.update.message.from.username) : 'Lo siento, no sé como ayudarle';
            
            const server = await translateService.serverMessage(message, user.source.language);
            event.reply(server.target.message);
        } 
        catch {
            const message = 'Mensaje no admitido';
            const server = await translateService.serverMessage(message, event.update.message.from.language_code);
            event.reply(server.target.message);
        }
    }
}