import { Gpio } from 'onoff';

export function readPin(num: number): Number {
    const pin = new Gpio(num, 'in');
    const result = pin.readSync();
    pin.unexport();
    return result ? 1 : 0;
}

export function writePin(num: number, value: boolean): void {
    const pin = new Gpio(num, 'out');
    value ? pin.writeSync(1) : pin.writeSync(0);
    pin.unexport();
}

export function sendPulse(num: number, time: number): void {
    writePin(num, true);
    setTimeout(() => writePin(num, false), time);
}