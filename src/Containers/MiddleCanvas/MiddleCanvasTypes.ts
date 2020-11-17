export interface ITemplatePrefill {
    [key: string]: {
        title: string,
        labels: string[] | string[][],
        componentType?: string
    };
};