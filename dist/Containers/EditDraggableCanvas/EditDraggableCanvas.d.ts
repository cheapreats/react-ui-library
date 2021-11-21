import React from 'react';
import { IDraggableTable } from "./_DraggableTable";
declare type canvasTypes = 'newUserCanvas' | 'editCanvas' | 'managementCanvas';
export interface IEditDraggableCanvas {
    /**
     * The current number of chairs being used in the layout
     */
    currentNumberOfChairs: number;
    /**
     * The Max amount of chairs the layout can have currently
     */
    maxCapacity: number;
    /**
     * How the canvas will be used in the application (newUserCanvas,
     * editCanvas, or managementCanvas)
     */
    canvasType: canvasTypes;
    /**
     * Array of DraggableTables
     */
    tables?: Array<IDraggableTable>;
    /**
     * Function to handle onClick event for the table
     * @param selectedChildIndex - the array index for the table
     */
    onTableClick: (selectedChildIndex: number) => void;
    /**
     * The function that will pass over the index value of DraggableTable in the array with its
     * coordinates on the canvas (x,y)
     * @param selectedChildIndex
     * @param deltaX
     * @param deltaY
     */
    handleStop: (selectedChildIndex: number, deltaX: number, deltaY: number) => void;
    /**
     * Index number for the currently selected table
     */
    selectedIndex: number;
    /** Function to handle onClick event for the chair
     * @param parentTableIndex - parent table index in the tables array
     * @param chairIndex - chair index in chair array
     */
    onChairClick: (parentTableIndex: number, chairIndex: number, selectedTableIndex: number) => void;
}
/**
 * Primary UI component for user interaction
 * EditDraggableCanvas
 */
export declare const EditDraggableCanvas: React.FC<IEditDraggableCanvas>;
export {};
