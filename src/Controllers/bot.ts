import Telegraf, { ContextMessageUpdate } from 'telegraf';
import { TranslateService } from './translate';
import { configuration } from '../configuration'

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
        event.reply(user.target.message);

        const server = await TranslateService.serverMessage(user.target.message, user.source.language);
        event.reply(server.target.message);
    }
}