export interface ITemplatePrefill {
    title: string,
    labels: string[][],
    componentType?: string
};

export interface IPrinterOptions {
    [key: string]: {
        title: string,
        labels: string[]
    };
}; 