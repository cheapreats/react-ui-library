interface FormatDateOptions {
    prepend?: string;
    append?: string;
    type?: string;
}
export declare class FormatDate {
    private date;
    private _res;
    constructor(date: Date);
    build: () => string;
    getYear: (options?: FormatDateOptions) => FormatDate;
    getMonth: (options?: FormatDateOptions) => FormatDate;
    getWeek: (options?: FormatDateOptions) => FormatDate;
    getDay: (options?: FormatDateOptions) => FormatDate;
    getHours: (options?: FormatDateOptions) => FormatDate;
    getMinutes: (options?: FormatDateOptions) => FormatDate;
    getSeconds: (options?: FormatDateOptions) => FormatDate;
    getPeriod: (options?: FormatDateOptions) => FormatDate;
}
declare type msToTime = (duration: number) => {
    hours: number;
    minutes: number;
    seconds: number;
};
/**
 * This function converts from milliseconds to hours, minutes and seconds
 * @param duration {number} - The number of milliseconds
 * @returns {{hours: number, minutes: number, seconds: number,}} The hours, minutes and seconds
 */
export declare const msToTime: msToTime;
/**
 * This function converts an input of hours and minutes into an output of milliseconds
 * @param hours {number} - The number of hours
 * @param minutes {number} - The number of minutes
 * @returns {number} The number of milliseconds
 */
export declare const hoursMinutesToMilliseconds: (hours: number, minutes: number) => number;
export {};
