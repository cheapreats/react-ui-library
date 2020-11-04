export interface ITemplatePrefill {
    [key: string]: {
        title: string,
        labels: string[][],
        display: string,
        column: boolean
    };
};

export interface IPrinterOptions {
    [key: string]: {
        title: string,
        labels: string[]
    };
};