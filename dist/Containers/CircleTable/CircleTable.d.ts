import React from 'react';
import { IChair } from "../Chair/Chair";
export declare type occupancyStatusTypes = 'Vacant' | 'Reserved' | 'Occupied';
declare type tableUseTypes = 'AddTableButton' | 'TableForEditCanvas' | 'TableForManagement';
export interface ICircleTable {
    /**
     * The shape for the ICircleTable ("Circle")
     */
    tableShape: 'Circle';
    /**
     * The unique identifier for the table
     */
    tableID: string;
    /**
     * Array of chairs
     */
    chairs: Array<IChair>;
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
     * The size for the component relative to the parent
     */
    relativeSize: number;
    /**
     * The use type for the table component (how it will be used in the app)
     */
    tableUse: tableUseTypes;
    /**
     * Array index for the table
     */
    arrayIndex?: number;
    /**
     * Function to handle onClick event for the table
     * @param selectedChildIndex - the array index for the table
     */
    onTableClick: (selectedChildIndex: number) => void;
    /**
     * Determines if the table is used in the toolbar or not
     */
    isNotHighlightedWhenSelected?: boolean;
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
}
/**
 * Primary UI component for user interaction
 */
export declare const CircleTable: React.FC<ICircleTable>;
export {};
