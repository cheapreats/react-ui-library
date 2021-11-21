export interface ITemplatePrefill {
    title: string;
    labels: string[][];
    componentType?: string;
}
export interface IPrinterOptions {
    [key: string]: {
        title: string;
        labels: string[];
    };
}
/**
 * Reorders the draggable elements in a list
 * @param {any} list - list of objects to reorder: should add a typing sequence
 * @param {number} startIndex - index of where the element originates from
 * @param {number} endIndex - index of where the element will be placed
 */
export declare function reorder(list: ITemplatePrefill[], startIndex: number, endIndex: number): ITemplatePrefill[];
export declare function reorder(list: string[][], startIndex: number, endIndex: number): string[][];
