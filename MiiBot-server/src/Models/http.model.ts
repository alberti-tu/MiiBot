export interface Message<T> {
    code: number; 
    message: string;
    result: T;
}

export interface Action {
    name: string;
    function: () => string;
}

export interface IntentMessage {
    query: string;
    prediction: {
        topIntent: string,
        intents: any,
        entities: any, 
        sentiment: {
            label: string,
            score: number
        }
    };
}

export interface TranslateMessage {
    source: { language: string, message: string };
    target: { language: string, message: string };
}