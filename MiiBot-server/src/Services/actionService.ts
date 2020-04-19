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
        await database.insertHistory(username, 'open');
        gpio.sendPulse(configuration.gpio.out.pulse, configuration.gpio.out.time);
        return 'Abriendo puerta ...';
    } catch {
        return 'Lo siento pero no tienes permiso para hacer esta acción';
    }
}

async function stateDoor(username: string): Promise<string> {
    try {
        if (await database.selectUser(username)) {
            const isClosed = gpio.readPin(configuration.gpio.in.close);
            const isOpened = gpio.readPin(configuration.gpio.in.open);
            
            let message = '';
            
            switch (isClosed.toString() + isOpened.toString()) {
                case '00':
                    message = 'La puerta está en movimento';
                    break;
                case '01':
                    message = 'La puerta está abierta';
                    break;
                case '10':
                    message = 'La puerta está cerrada';
                    break;
                case '11':
                    message = 'Error en la lectura, revise el circuito';
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
        await database.insertHistory(username, 'close');
        gpio.sendPulse(configuration.gpio.out.pulse, configuration.gpio.out.time);
        return 'Abriendo puerta ...';
    } catch {
        return 'Lo siento pero no tienes permiso para hacer esta acción';
    }
}

async function closeChat(username: string): Promise<string> {
    return 'Encantado de ayudarte, hasta la próxima';
}
