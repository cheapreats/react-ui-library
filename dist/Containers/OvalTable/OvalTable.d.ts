import React from "react";
import { IChair } from "./..";
declare type tableUseTypes = 'AddTableButton' | 'TableForEditCanvas' | 'TableForManagement';
declare type chairsPositionType = 'top' | 'bottom' | 'left' | 'right' | 'around';
export interface IOvalTable {
    chairs: Array<IChair>;
    relativeSize: number;
    tableUse: tableUseTypes;
    tableIndex: number;
    selectedIndex: number;
    chairsPosition: chairsPositionType;
}
/**
 * Primary UI component for user interaction
 */
export declare const OvalTable: React.FC<IOvalTable>;
export {};
