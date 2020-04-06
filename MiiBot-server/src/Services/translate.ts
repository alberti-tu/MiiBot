import axios from 'axios';
import { TranslateMessage } from '../Models/interfaces';
import { configuration } from '../config';

export async function userMessage(message: string): Promise<TranslateMessage> {
    const params = { client: 'gtx', sl: 'auto', tl: configuration.translate.serverLanguage, dt: 't', q: message }
    const response = await axios.get(configuration.translate.url, { params });

    const result: TranslateMessage = {
        source: { language: response.data[2], message: response.data[0][0][1] },
        target: { language: configuration.translate.serverLanguage, message: response.data[0][0][0] }
    };

    return result;
}

export async function serverMessage(message: string, language: string): Promise<TranslateMessage> {
    let result: TranslateMessage = null;

    if (configuration.translate.serverLanguage === language) {
        result = {
            source: { language: configuration.translate.serverLanguage, message: message },
            target: { language: language, message: message }
        };
    } else {
        const params = { client: 'gtx', sl: configuration.translate.serverLanguage, tl: language, dt: 't', q: message }
        const response = await axios.get(configuration.translate.url, { params });

        result = {
            source: { language: configuration.translate.serverLanguage, message: response.data[0][0][1] },
            target: { language: language, message: response.data[0][0][0] }
        };
    }

    return result;
}