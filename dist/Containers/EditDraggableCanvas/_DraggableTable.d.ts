import React from 'react';
import { ISquareTable } from "../SquareTable/SquareTable";
import { ICircleTable } from "../CircleTable/CircleTable";
declare type tableInputType = ISquareTable | ICircleTable;
export interface IDraggableTable {
    /**
     * The input for the DraggableTable
     */
    tableInput: tableInputType;
    /**
     * The starting coordinates on the canvas for the table
     */
    defaultXY: {
        x: number;
        y: number;
    };
    /**
     * Array index for the table
     */
    arrayIndex: number;
    /**
     * Whether the draggable functionality is disabled (if true, then disabled)
     */
    isDisabled?: boolean;
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
    /**
     * Function to handle onClick event for the chair
     * @param parentTableIndex - parent table index in the tables array
     * @param chairIndex - chair index in chair array
     */
    onChairClick: (parentTableIndex: number, chairIndex: number, selectedTableIndex: number) => void;
    /**
     * The name of the layout the IDraggableTable is a part of
     */
    layoutName?: string;
}
/**
 * Primary UI component for user interaction
 * EditDraggableCanvas
 */
export declare const DraggableTable: React.FC<IDraggableTable>;
export {};
