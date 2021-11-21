import { ILeftSideBarInterface, IDraggableComponent } from './ReceiptElements';
/**
 * Filters draggable components based on editor category name given
 * @param {string} categoryName - Name of editor Category
 * @param {ILeftSideBarInterface} receiptElements - List of all draggableComponents with every category
 * @returns {IDraggableComponent} - Matched category draggable components
 */
export declare const getCategoryElements: (categoryName: string, receiptElements: ILeftSideBarInterface) => IDraggableComponent;
