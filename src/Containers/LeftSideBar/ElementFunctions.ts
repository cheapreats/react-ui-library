import { ILeftSideBarInterface, IDraggableComponent } from './ReceiptElements';

const FIRST_VALUE = 0;

/**
 * Filters draggable components based on editor category name given 
 * @param {string} categoryName - Name of editor Category
 * @param {ILeftSideBarInterface} receiptElements - ReceiptElements we are finding draggableComponents
 * @returns {IDraggableComponent} - Matched category draggable components
 */
export const getCategoryElements = (categoryName: string, receiptElements: ILeftSideBarInterface): IDraggableComponent => {
    const matchedCategory = Object.values(receiptElements).filter(el => el.editorCategory === categoryName);
    return matchedCategory[FIRST_VALUE].draggableComponents;
};

/**
 * When draggable element finishes dragging
 * @returns {void} 
 */
export const onDragEnd = () => {
    console.log('I have been dragged.');
};