export const configuration = {
    server: {
        port: 80
    },
    bot: {
        token: '806141292:AAF_0ZY2VdZ4f7EzWQLDEPXrfgJnQB1Volg'
    },
    endpoint: {
        nlp: 'https://westeurope.api.cognitive.microsoft.com/luis/prediction/v3.0/apps/740ea2e4-9659-4474-86e4-da9025e94384/slots/production/predict?subscription-key=47b72506b4554fe7a8811ef1e71c4cf9&verbose=true&show-all-intents=true&log=false&query=',
        translate: 'https://translate.googleapis.com/translate_a/single'
    },
    mariaDB: {
        database: 'MiiBot',
        host: 'localhost',
        user: 'root'
    },
};