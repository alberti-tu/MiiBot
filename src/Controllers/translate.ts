import axios from 'axios';
import { configuration } from '../configuration'

export interface TranslateMessage {
    source: { language: string, message: string };
    target: { language: string, message: string };
}

export class TranslateService {

    private static language: string = 'es';

    public static async serverMessage(message: string, language: string): Promise<TranslateMessage> {
        const params = { client: 'gtx', sl: TranslateService.language, tl: language, dt: 't', q: message }
        const response = await axios.get(configuration.endpoint.translate, { params });

        const result: TranslateMessage = {
            source: { language: TranslateService.language, message: response.data[0][0][1] },
            target: { language: language, message: response.data[0][0][0] }
        };

        return result;
    }

    public static async userMessage(message: string): Promise<TranslateMessage> {
        const params = { client: 'gtx', sl: 'auto', tl: TranslateService.language, dt: 't', q: message }
        const response = await axios.get(configuration.endpoint.translate, { params });

        const result: TranslateMessage = {
            source: { language: response.data[2], message: response.data[0][0][1] },
            target: { language: TranslateService.language, message: response.data[0][0][0] }
        };

        return result;
    }
}















/*
const axios = require('axios').default;
const URL = 'https://translate.googleapis.com/translate_a/single';

class TranslateService {

    serverLanguage = 'es';

    constructor() {}

    async serverMessage(message, language) {
        const params = { client: 'gtx', sl: this.serverLanguage, tl: language, dt: 't', q: message }
        const response = await axios.get(URL, { params });

        const result = {
            source: { language: this.serverLanguage, message: response.data[0][0][1] },
            target: { language: language, message: response.data[0][0][0] }
        };

        return result;
    }

    async userMessage(message) {
        const params = { client: 'gtx', sl: 'auto', tl: this.serverLanguage, dt: 't', q: message }
        const response = await axios.get(URL, { params });

        const result = {
            source: { language: response.data[2], message: response.data[0][0][1] },
            target: { language: this.serverLanguage, message: response.data[0][0][0] }
        };

        return result;
    }
}

module.exports.TranslateService = TranslateService;
*/