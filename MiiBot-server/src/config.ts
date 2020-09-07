export const configuration = {
    bot: {
        token: '806141292:AAF_0ZY2VdZ4f7EzWQLDEPXrfgJnQB1Volg',     // Telegram API token
        url:'https://westeurope.api.cognitive.microsoft.com/luis/prediction/v3.0/apps/740ea2e4-9659-4474-86e4-da9025e94384/slots/production/predict?subscription-key=47b72506b4554fe7a8811ef1e71c4cf9&verbose=true&show-all-intents=true&log=false&query='
    },
    gpio: {
        in: {
            close: 22,                                              // Pin number to detect the close door state
            open: 23,                                               // Pin number to detect the open door state
        },
        out: {
            pulse: 27,                                              // Pin number to send open/close square pulse
            time: 1000                                              // Square pulse duration (ms)
        }
    },
    mariaDB: {
        database: 'MiiBot',
        host: 'localhost',
        user: 'root'
    },
    server: {
        port: 8080,
        secret: 'secret',                                           // Key to encrypt authentication tokens
        timeout: '1d'                                               // Expiration time of the authentication token
    },
    translate: {
        serverLanguage: 'es',
        url: 'https://translate.googleapis.com/translate_a/single'
    }
};
