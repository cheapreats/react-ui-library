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

const NO_OF_ITEMS_DELETED = 1;
const REMOVE_NO_ITEMS = 0;

/**
 * Reorders the draggable elements in a list
 * @param {any} list - list of objects to reorder: should add a typing sequence
 * @param {number} startIndex - index of where the element originates from
 * @param {number} endIndex - index of where the element will be placed
 */
export function reorder(
    list: ITemplatePrefill[],
    startIndex: number,
    endIndex: number,
): ITemplatePrefill[];

export function reorder(
    list: string[][],
    startIndex: number,
    endIndex: number,
): string[][];

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function reorder(list: any, startIndex: number, endIndex: number): any {
    const [removed] = list.splice(startIndex, NO_OF_ITEMS_DELETED);
    list.splice(endIndex, REMOVE_NO_ITEMS, removed);
    return list;
}
