import { ReceiptElements, IDraggableComponent } from './ReceiptElements';

/**
 * Filters draggable components based on editor category name given 
 * @param {string} categoryName - Name of editor Category
 * @returns {IDraggableComponent} - Matched category draggable components
 */
export const getCategoryElements = (categoryName: string): IDraggableComponent => {
    const matchedCategory = Object.values(ReceiptElements).find(el => el.editorCategory === categoryName);
    return matchedCategory.draggableComponents;
};