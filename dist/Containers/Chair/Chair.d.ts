import React from 'react';
declare type Position = 'top' | 'bottom' | 'left' | 'right';
declare type tableUseTypes = 'AddTableButton' | 'TableForEditCanvas' | 'TableForManagement';
export interface IChair {
    position: Position;
    isSeated: boolean;
    occupiedBy: string;
    isVisible: boolean;
    isRound?: boolean;
    relativeSize: number;
    tableUse: tableUseTypes;
    tableIndex: number;
    chairIndex: number;
    selectedIndex: number;
    /**
     * Function to handle onClick event for the chair
     * @param parentTableIndex - parent table index in the tables array
     * @param chairIndex - chair index in chair array
     */
    onChairClick: (parentTableIndex: number, chairIndex: number, selectedIndex: number) => void;
}
/**
 * Primary UI component for user interaction
 */
export declare const Chair: React.FC<IChair>;
export {};
