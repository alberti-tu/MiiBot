import { Action } from '../Models/http.model';
import * as database from '../Controllers/database';
import * as gpio from '../Controllers/gpio';
import { configuration } from '../config';

export const actions: Action[] = [
    { name: 'Bienvenida', function: (username: string) => welcome(username) },
    { name: 'Cochera-abrir', function: (username: string) => openDoor(username) },
    { name: 'Cochera-estado', function: (username: string) => stateDoor(username) },
    { name: 'Cochera-cerrar', function: (username: string) => closeDoor(username) },
    { name: 'Despedida', function: (username: string) => closeChat(username) },
];

async function welcome(username): Promise<string> {
    return 'Hola';
}

async function openDoor(username: string): Promise<string> {
    try {
        const result = await database.selectUserId(username);
        if (result.length === 1) {
            await gpio.sendPulse(configuration.gpio.out.pulse, configuration.gpio.out.time);
            await database.insertHistory(result[0].id, 'open');
            return 'Abriendo puerta ...';
        } else {
            return 'Lo siento pero no tienes permiso para hacer esta acción';
        }
    } catch {
        return 'Ha ocurrido un error inesperado, revise el sistema';
    }
}

async function stateDoor(username: string): Promise<string> {
    try {
        const result = await database.selectUserId(username);
        if (result.length === 1) {
            const isClosed = gpio.readPin(configuration.gpio.in.close);
            const isOpened = gpio.readPin(configuration.gpio.in.open);
            
            let message = '';
            
            switch (isClosed.toString() + isOpened.toString()) {
                case '00':
                    message = 'La puerta está en movimento';
                    break;
                case '01':
                    message = 'La puerta está abierta'
                    break;
                case '10':
                    message = 'La puerta está cerrada'
                    break;
                case '11':
                    message = 'Error en la lectura, revise el circuito'
                    break;
            }
    
            return message;
        } else {
            return 'Lo siento pero no tienes permiso para hacer esta acción';
        }
    } catch {
        return 'Ha ocurrido un error inesperado, revise el sistema';
    }
}

async function closeDoor(username: string): Promise<string> {
    try {
        const result = await database.selectUserId(username);
        if (result.length === 1) {
            await gpio.sendPulse(configuration.gpio.out.pulse, configuration.gpio.out.time);
            await database.insertHistory(result[0].id, 'close');
            return 'Cerrando puerta ...';
        } else {
            return 'Lo siento pero no tienes permiso para hacer esta acción';
        }
    } catch {
        return 'Ha ocurrido un error inesperado, revise el sistema';
    }
}

async function closeChat(username): Promise<string> {
    return 'Encantado de ayudarte, hasta la próxima';
}
