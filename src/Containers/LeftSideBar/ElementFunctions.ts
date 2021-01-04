import { ILeftSideBarInterface, IDraggableComponent } from './ReceiptElements';

const FIRST_VALUE = 0;
/**
 * Filters draggable components based on editor category name given
 * @param {string} categoryName - Name of editor Category
 * @param {ILeftSideBarInterface} receiptElements - List of all draggableComponents with every category
 * @returns {IDraggableComponent} - Matched category draggable components
 */
export const getCategoryElements = (
    categoryName: string,
    receiptElements: ILeftSideBarInterface,
): IDraggableComponent => {
    const matchedCategory = Object.values(receiptElements).filter(
        (el) => el.editorCategory === categoryName,
    );
    return matchedCategory[FIRST_VALUE].draggableComponents;
};
