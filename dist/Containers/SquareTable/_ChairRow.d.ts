import React from 'react';
import { IChair } from '../Chair/Chair';
declare type Position = 'top' | 'bottom' | 'left' | 'right';
declare type tableUseTypes = 'AddTableButton' | 'TableForEditCanvas' | 'TableForManagement';
interface IChairRow {
    /**
     * The position of the chair relative to the table (top/bottom/left/right)
     */
    position: Position;
    /**
     * Array of chairs
     */
    chairs: Array<IChair>;
    /**
     * The size for the component relative to the parent
     */
    relativeSize: number;
    /**
     * The use type for the table component (how it will be used in the app)
     */
    tableUse: tableUseTypes;
    /**
     * Index number for the currently selected table
     */
    selectedIndex: number;
}
/**
 * ChairRow component for chair placement around tables
 */
export declare const ChairRow: React.FC<IChairRow>;
export {};
