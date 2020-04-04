import Telegraf, { ContextMessageUpdate } from 'telegraf';
import axios from 'axios';
import { TranslateService } from '../Services/translate';
import { configuration } from '../config'
import { actions } from '../Services/actions';
import { Intent } from '../Models/interfaces';

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
        const server = await TranslateService.serverMessage(message, event.update.message.from.language_code);
        event.reply(server.target.message);
    }

    private async helpMessage(event: ContextMessageUpdate) {
        const message = 'Enviame un sticker';
        const server = await TranslateService.serverMessage(message, event.update.message.from.language_code);
        event.reply(server.target.message);
    }

    private async messageResponse(event: ContextMessageUpdate) {
        const user = await TranslateService.userMessage(event.update.message.text);

        const response = await axios.get<Intent>(configuration.endpoint.nlp + user.target.message);
        let result = response.data.prediction.topIntent;

        const action = actions.find(item => item.name === result);
        const message = action !== undefined ? action.function() : 'Lo siento, no sé como ayudarle';

        console.log(user.source.language);
        
        const server = await TranslateService.serverMessage(message, user.source.language);
        event.reply(server.target.message);
    }
}