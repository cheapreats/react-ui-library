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

export type reorderListType = (list: ITemplatePrefill[], startIndex: number, endIndex: number) => ITemplatePrefill[]; 
export type reorderElementsType = (list: string[][], startIndex: number, endIndex: number) => string[][];
export type getHeaderComponentType = (componentType: string | undefined, labels: string[][]) => React.ReactElement;

const NO_OF_ITEMS_DELETED = 1;
const REMOVE_NO_ITEMS = 0;

/**
 * Reorders the draggable elements in a list
 * @param {any} list - list of objects to reorder: should add a typing sequence
 * @param {number} startIndex - index of where the element originates from
 * @param {number} endIndex - index of where the element will be placed
 */
export const reorder = (list, startIndex, endIndex) => {
    const [removed] = list.splice(startIndex, NO_OF_ITEMS_DELETED);
    list.splice(endIndex, REMOVE_NO_ITEMS, removed);
    return list;
};

export const reorderList: reorderListType = reorder;
export const reorderElements: reorderElementsType = reorder;