export interface ITemplatePrefill {
    [key: string]: {
        title: string,
        labels: string[][] | string[],
    };
};

export interface IPrinterOptions {
    [key: string]: {
        title: string,
        labels: string[]
    };
};