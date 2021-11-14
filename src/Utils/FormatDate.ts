import { MONTHS, WEEKDAYS } from './Constants';

interface FormatDateOptions {
    prepend?: string;
    append?: string;
    type?: string;
}

export class FormatDate {
    private date: Date;

    private _res = '';

    public constructor(date: Date) {
        this.date = date;
    }

    public build = (): string => this._res;

    public getYear = (options: FormatDateOptions = {}): FormatDate => {
        const { prepend = '', append = '', type } = options;

        let res = this.date.getFullYear().toString();
        if (type === 'Y') res = res.slice(-2);
        this._res += prepend + res + append;
        return this;
    };

    public getMonth = (options: FormatDateOptions = {}): FormatDate => {
        const { prepend = '', append = '', type } = options;

        let res = this.date.getMonth().toString();
        switch (type) {
            case 'MM':
                res = res.padStart(2, '0');
                break;
            case 'MMM':
                res = MONTHS[res].slice(0, 3);
                break;
            case 'MMMM':
                res = MONTHS[res];
                break;
            default:
                break;
        }
        this._res += prepend + res + append;
        return this;
    };

    public getWeek = (options: FormatDateOptions = {}): FormatDate => {
        const { prepend = '', append = '', type } = options;

        let res = this.date.getDay().toString();
        switch (type) {
            case 'WW':
                res = res.padStart(2, '0');
                break;
            case 'WWW':
                res = WEEKDAYS[res].slice(0, 3);
                break;
            case 'WWWW':
                res = WEEKDAYS[res];
                break;
            default:
                break;
        }
        this._res += prepend + res + append;
        return this;
    };

    public getDay = (options: FormatDateOptions = {}): FormatDate => {
        const { prepend = '', append = '', type } = options;

        let res = this.date.getDay().toString();
        if (type === 'DD') res = res.padStart(2, '0');
        this._res += prepend + res + append;
        return this;
    };

    public getHours = (options: FormatDateOptions = {}): FormatDate => {
        const { prepend = '', append = '', type } = options;

        let res = this.date.getHours().toString();
        switch (type) {
            case 'hh':
                res = res.padStart(2, '0');
                break;
            case 'hp':
                res = (parseInt(res, 10) % 12).toString();
                break;
            case 'hhp':
                res = (parseInt(res, 10) % 12).toString().padStart(2, '0');
                break;
            default:
                break;
        }
        this._res += prepend + res + append;
        return this;
    };

    public getMinutes = (options: FormatDateOptions = {}): FormatDate => {
        const { prepend = '', append = '', type } = options;

        let res = this.date.getMinutes().toString();
        if (type === 'mm') res = res.padStart(2, '0');
        this._res += prepend + res + append;
        return this;
    };

    public getSeconds = (options: FormatDateOptions = {}): FormatDate => {
        const { prepend = '', append = '', type } = options;

        let res = this.date.getSeconds().toString();
        if (type === 'ss') res = res.padStart(2, '0');
        this._res += prepend + res + append;
        return this;
    };

    public getPeriod = (options: FormatDateOptions = {}): FormatDate => {
        const { prepend = '', append = '', type } = options;

        let res = this.date.getHours() >= 12 ? 'PM' : 'AM';
        if (type === 'p') res = res.toLowerCase();
        this._res += prepend + res + append;
        return this;
    };
}

/* For future fancy string template version
const types = [
    // Year - Example: 19, 2019
    'Y', 'YY',
    // Month - Example: 3, 03, Mar, March
    'M', 'MM', 'MMM', 'MMMM',
    // Week - Example: 0, Sun, Sunday
    'W', 'WW', 'WWW',
    // Day - Example: 2, 02
    'D', 'DD',
    // Hour - Example: 16, 16, 4, 04
    'h', 'hh', 'hp', 'hhp',
    // Minute - Example: 8, 08
    'm', 'mm',
    // Second - Example: 6, 06
    's', 'ss',
    // Period - Example (am/pm), (AM/PM)
    'p', 'P'
]; */

type msToTime = (duration: number) => {
    hours: number;
    minutes: number;
    seconds: number;
};

/**
 * This function converts from milliseconds to hours, minutes and seconds
 * @param duration {number} - The number of milliseconds
 * @returns {{hours: number, minutes: number, seconds: number,}} The hours, minutes and seconds
 */
export const msToTime: msToTime = (duration) => {
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    return { hours, minutes, seconds };
};

/**
 * This function converts an input of hours and minutes into an output of milliseconds
 * @param hours {number} - The number of hours
 * @param minutes {number} - The number of minutes
 * @returns {number} The number of milliseconds
 */
export const hoursMinutesToMilliseconds = (
    hours: number,
    minutes: number,
): number => (hours * 60 * 60 + minutes * 60) * 1000;
