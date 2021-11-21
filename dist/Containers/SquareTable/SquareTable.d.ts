/**
 * Documentation – the order of chairs are in the chairs array will populate the table from top left to the bottom right
 * “the purpose of the order in the array is to populate the chairs from top left to bottom right”
 */
import React from 'react';
import { IChair } from '../Chair/Chair';
declare type occupancyStatusTypes = 'Vacant' | 'Reserved' | 'Occupied';
declare type tableUseTypes = 'AddTableButton' | 'TableForEditCanvas' | 'TableForManagement';
export interface ISquareTable {
    /**
     * The shape for the ISquareTable ("Square", "HorizontalRectangle", "VerticalRectangle")
     */
    tableShape: 'Square' | 'HorizontalRectangle' | 'VerticalRectangle';
    /**
     * The unique identifier for the table
     */
    tableID: string;
    /**
     * The name of the party assigned to the table
     */
    partyName: string;
    /**
     * The occupancy status for the table
     */
    occupancyStatus: occupancyStatusTypes;
    /**
     * Timer for the last time that table was served
     * format: Hours:Minutes:Seconds
     */
    timeLastServed: string;
    /**
     * Array of chairs
     */
    chairs: Array<IChair>;
    /**
     * Whether the table is a square
     */
    isSquare: boolean;
    /**
     * The size for the component relative to the parent
     */
    relativeSize: number;
    /**
     * The use type for the table component (how it will be used in the app)
     */
    tableUse: tableUseTypes;
    /**
     * Array index number for this table
     */
    arrayIndex?: number;
    /**
     * Index number for the currently selected table
     */
    selectedIndex: number;
    /**
     * Function to handle onClick event for the table
     * @param selectedChildIndex - the array index for the table
     */
    onTableClick: (selectedChildIndex: number) => void;
    /**
     * Function to handle onClick event for the chair
     * @param parentTableIndex - parent table index in the tables array
     * @param chairIndex - chair index in chair array
     */
    onChairClick: (parentTableIndex: number, chairIndex: number, selectedTableIndex: number) => void;
    /**
     * Determines if the table is used in the toolbar or not
     */
    isNotHighlightedWhenSelected?: boolean;
}
/**
 * Primary UI component for user interaction
 * Square Table
 */
export declare const SquareTable: React.FC<ISquareTable>;
export {};
