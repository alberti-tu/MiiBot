import axios from 'axios';
import { TranslateMessage } from '../Models/interfaces';
import { configuration } from '../config';

export class TranslateService {

    private static language: string = 'es';

    public static async userMessage(message: string): Promise<TranslateMessage> {
        const params = { client: 'gtx', sl: 'auto', tl: TranslateService.language, dt: 't', q: message }
        const response = await axios.get(configuration.endpoint.translate, { params });

        const result: TranslateMessage = {
            source: { language: response.data[2], message: response.data[0][0][1] },
            target: { language: TranslateService.language, message: response.data[0][0][0] }
        };

        return result;
    }

    public static async serverMessage(message: string, language: string): Promise<TranslateMessage> {
        let result: TranslateMessage = null;

        if (TranslateService.language === language) {
            result = {
                source: { language: TranslateService.language, message: message },
                target: { language: language, message: message }
            };
        } else {
            const params = { client: 'gtx', sl: TranslateService.language, tl: language, dt: 't', q: message }
            const response = await axios.get(configuration.endpoint.translate, { params });
    
            result = {
                source: { language: TranslateService.language, message: response.data[0][0][1] },
                target: { language: language, message: response.data[0][0][0] }
            };
        }

        return result;
    }
}