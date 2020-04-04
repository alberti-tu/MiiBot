import Telegraf, { ContextMessageUpdate } from 'telegraf';

export class MiiBot {

    private bot: Telegraf<ContextMessageUpdate> = null;

    constructor() {
        this.bot = new Telegraf('806141292:AAF_0ZY2VdZ4f7EzWQLDEPXrfgJnQB1Volg');

        this.bot.start(event => this.welcomeMessage(event));
        this.bot.help(event => this.helpMessage(event));
        this.bot.on('sticker', event => event.reply('👍'));

        this.bot.launch();
        console.log('Bot launched');
    }

    private welcomeMessage(event: ContextMessageUpdate) {
        event.reply('Welcome ' + event.update.message.from.username + '!');
    }

    private helpMessage(event: ContextMessageUpdate) {
        event.reply('Send me a sticker');
    }
}