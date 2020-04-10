import { Gpio } from 'onoff';

export function readPin(num: number): Number {
    if (Gpio.accessible) {
        const pin = new Gpio(num, 'in');
        const result = pin.readSync();
        pin.unexport();
        return result ? 1 : 0;
    } else {
        return Math.round(Math.random());
    }
}

export function sendPulse(num: number, time: number): void {
    if (Gpio.accessible) {
        const pin = new Gpio(num, 'out');
        pin.writeSync(1);
        setTimeout(() => {
           pin.writeSync(0);
           pin.unexport();
        }, time);
    } else {
        console.log('Pin ' + num + ': High');
        setTimeout(() => {
            console.log('Pin ' + num + ': Low');
        }, time);
    }
}
